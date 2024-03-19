import React, { useRef, useState } from "react";
import { ProductSummaryContext, ProductSummaryTypes } from 'vtex.product-summary-context'
import { SKU } from "vtex.product-summary-context/react/ProductSummaryTypes";
const { useProductSummary, useProductSummaryDispatch } = ProductSummaryContext;

import { default as s } from "./styles.css";
import { Item, SkuSpecification, SkuSpecificationValues } from "vtex.product-context/react/ProductTypes";

type Field = {
    skuName: string
    skuOptions: Array<SKUOption>
}

type SKUOption = {
    name: string
    originalName?: string
}

type Variation = {
    name: string
    values: Array<string>
}

type SKUButton = {
    label: string
    selected: boolean
}

type SelectedSKU = {
    Color: string,
    Size: string
}

const StarterKitSKUSelector = () => {
    const { product } = useProductSummary();
    const dispatch = useProductSummaryDispatch();

    const allSKUs = product.skuSpecifications;

    // // Testing
    // const theCage = product.productName.includes("Cage");
    // if (!theCage) return <></>;

    const items = product?.items;
    if (!items) return <></>;

    const allColors = allSKUs.find(sku => sku.field.name === "Color")?.values!;
    const allColorSKUs: SKUButton[] = allColors.map(sku => {
        return {
            label: sku.name,
            selected: false
        }
    });

    const allSizes = allSKUs.find(sku => sku.field.name === "Size")?.values!;
    const allSizeSKUs: SKUButton[] = allSizes.map(sku => {
        return {
            label: sku.name,
            selected: false
        }
    });

    const [selectedSKU, setSelectedSKU] = useState<SelectedSKU>({ Color: "", Size: "" });
    const [colorSKUs, setColorSKUs] = useState<SKUButton[]>(allColorSKUs);
    const [sizeSKUs, setSizeSKUs] = useState<SKUButton[]>(allSizeSKUs);

    const colorRef = useRef<HTMLSelectElement>(null);
    const sizeRef = useRef<HTMLSelectElement>(null);

    const showColorSKUs = allColorSKUs.length > 1;
    const showSizeSKUs = allSizeSKUs.length > 1;

    const stopBubblingUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const findSingleSKU = (selectedSKU: any) => {
        const singleSelectedSKU = items.find(item => {
            const variations: Variation[] = getVariations(item);

            const colorMatch = variations.find(variation => variation.values[0] === selectedSKU.Color);
            const sizeMatch = variations.find(variation => variation.values[0] === selectedSKU.Size);

            if (!colorMatch || !sizeMatch) return undefined;

            return item;
        });

        if (!singleSelectedSKU) {
            resetSKUSelection();
        } else {
            sendToDispatch(singleSelectedSKU.itemId);
        }
    }

    const resetSKUSelection = () => {
        console.info("Not available in desired combination");
        if (!colorRef.current || !sizeRef.current) return;

        colorRef.current.value = "null";
        sizeRef.current.value = "null";

        setSelectedSKU({ Color: "", Size: "" });

        dispatch({
            type: 'SET_PRODUCT_QUERY',
            args: { query: '' },
        });
    }

    const sendToDispatch = (itemId: string) => {
        const selectedItem = product.items.find(item => item.itemId === itemId)! as ProductSummaryTypes.SKU;

        const sku = {
            ...selectedItem,
            image: selectedItem.images[0],
            seller: selectedItem.sellers[0] as ProductSummaryTypes.Seller
        }

        const newProduct = {
            ...product,
            selectedItem,
            sku
        }

        dispatch({
            type: 'SET_PRODUCT',
            args: { product: newProduct },
        });

        dispatch({
            type: 'SET_PRODUCT_QUERY',
            args: { query: `skuId=${itemId}` },
        })
    }

    const updateStateObject = (selectedValue: string, skuType: string) => {
        const keyFix = skuType as keyof SelectedSKU;
        const tempState = selectedSKU;

        tempState[keyFix] = selectedValue;
        setSelectedSKU(tempState);
    }

    // @ts-ignore - variations are not present on the ProductSummaryTypes.SKU object.
    const getVariations = (item: ProductSummaryTypes.SKU) => item.variations;

    const getAlternateSKUTypeSKUs = (skuType: string, selectedValue: string) => {
        return items.filter(item => {
            const variations: Variation[] = getVariations(item);

            const skuVariation = variations.find(variation => variation.name === skuType);
            const foundVariation = skuVariation?.values[0] === selectedValue;
            return foundVariation;
        });
    }

    const getNewSKUs = (allApplicableItems: ProductSummaryTypes.SKU[], skuType: string) => {
        return allApplicableItems.map(item => {
            const variations: Variation[] = getVariations(item);
            const variationName = variations.find(variation => variation.name === (skuType === "Color" ? "Size" : "Color"))?.values[0];

            const button: SKUButton = {
                label: variationName || "",
                selected: false
            }
            return button;
        });
    }

    const handleSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const target = event.target;
        const selectedValue = target.value;
        const skuType = target.dataset.skuType!;

        if (selectedValue === "null") {
            const keyFix = skuType as keyof SelectedSKU;
            const tempState = selectedSKU;
            tempState[keyFix] = ""
            setSelectedSKU(tempState);
            return;
        }

        const allApplicableItems = getAlternateSKUTypeSKUs(skuType, selectedValue);
        const newSKUs = getNewSKUs(allApplicableItems, skuType);

        switch (skuType) {
            case "Color": {
                if (selectedValue === "null") {
                    setSizeSKUs(allSizeSKUs);
                    return;
                } else {
                    setSizeSKUs(newSKUs);
                }

                if (newSKUs.length === 1) {
                    console.info("only one option");
                }

                // Highlight or normalize clicked SKU.
                const tempSKUs = [...allColorSKUs];
                const selectedIndex = tempSKUs.findIndex(sku => sku.label === selectedValue);

                tempSKUs[selectedIndex].selected = true;
                setColorSKUs(tempSKUs);

                updateStateObject(selectedValue, skuType);

                if (selectedSKU.Size) {
                    const tempSKU = selectedSKU;

                    tempSKU.Color = selectedValue;
                    findSingleSKU(tempSKU);
                    return;
                }

                break;
            }

            case "Size": {
                if (selectedValue === "null") {
                    setColorSKUs(allColorSKUs);
                    return;
                } else {
                    setColorSKUs(newSKUs);
                }

                if (newSKUs.length === 1) {
                    console.info("only one option");
                }

                // Highlight or normalize clicked SKU.
                const tempSKUs = [...allSizeSKUs];
                const selectedIndex = tempSKUs.findIndex(sku => sku.label === selectedValue);

                tempSKUs[selectedIndex].selected = true;
                setSizeSKUs(tempSKUs);

                updateStateObject(selectedValue, skuType);

                if (selectedSKU.Color) {
                    const tempSKU = selectedSKU;

                    tempSKU.Size = selectedValue;
                    findSingleSKU(tempSKU);
                    return;
                }

                break;
            }

            default: break;
        }
    }

    return (
        <div onClick={stopBubblingUp} className={s.starterKitSKUList}>
            {(showColorSKUs || showSizeSKUs) &&
                <form name={product.productName}>
                    <label className={s.skuLabel}>
                        <div className={s.skuLabelText}>Color:</div>
                        <select ref={colorRef} onChange={handleSelectOption} data-sku-type="Color" className={s.skuSelect}>
                            <option value="null" className={s.skuOption}>Choose Color</option>
                            {colorSKUs.map(sku => (
                                <option key={sku.label} value={sku.label} className={s.skuOption}>{sku.label}</option>
                            ))}
                        </select>
                    </label>

                    <label className={s.skuLabel}>
                        <div className={s.skuLabelText}>Size:</div>
                        <select ref={sizeRef} onChange={handleSelectOption} data-sku-type="Size" className={s.skuSelect}>
                            <option value="null" className={s.skuOption}>Choose Size</option>
                            {sizeSKUs.map(sku => (
                                <option key={sku.label} value={sku.label} className={s.skuOption}>{sku.label}</option>
                            ))}
                        </select>
                    </label>
                </form>}
        </div>
    )
};

export default StarterKitSKUSelector;
