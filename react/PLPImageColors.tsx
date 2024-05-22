import React, { useState } from "react";
import { ProductSummaryContext } from 'vtex.product-summary-context'
const { useProductSummary } = ProductSummaryContext;

import { stringTriggers } from "./PDP24";
import { trailingZero } from "./utils";

import { default as s } from "./styles.css";

type SKUImageObject = {
    itemColor: string
    itemName: string
    itemImageSource: string
    imageId: string
}
const resultWidth = 300;
const plpImageWidth = resultWidth;
const plpImageHeight = plpImageWidth;
const colorWidth = 70;
const colorHeight = colorWidth;

// You may replace either dimension with auto.
const sourceString = (id: string, width: number = plpImageWidth, height: number = plpImageHeight) => `/arquivos/ids/${id}-${width}-${height}?quality=10`;

const PLPImageColors = () => {
    const { product } = useProductSummary();
    const items = product.items;

    const [plpTrainIndex, setPLPTrainIndex] = useState(0);
    const [trainState, setTrainState] = useState({ left: false, right: true });

    const uglyColorList: Array<SKUImageObject> = product.items.map((item) => {
        // @ts-ignore - variations are not present on the ProductSummaryTypes.SKU object.
        const colorIndex = item.variations.findIndex(variation => variation.name === "Color");

        // Gift Card Exception
        if (colorIndex === -1 && item.name.toLowerCase().includes("email")) {
            return {
                itemColor: "",
                itemName: "",
                itemImageSource: "",
                imageId: ""
            }
        }

        return {
            // @ts-ignore - variations are not present on the ProductSummaryTypes.SKU object.
            itemColor: item.variations[colorIndex].values[0],
            itemName: item.name,
            itemImageSource: item.images[0].imageUrl,
            imageId: item.images[0].imageId
        }
    });

    const colors = uglyColorList.map((item) => item.itemColor);
    const colorList = uglyColorList.filter((item, index) => !colors.includes(item.itemColor, index + 1));
    const showColorOptions = colorList.length > 1;

    const firstNotBlackIndex = items.findIndex(item => {
        const itemName = item.name.toLowerCase();
        const itemIsBlack = itemName.includes("black");
        return !itemIsBlack;
    });

    const initialProductIndex = firstNotBlackIndex > -1 ? firstNotBlackIndex : 0;

    const [currentImageIds, setCurrentImageIds] = useState(product.items[initialProductIndex].images.map(item => item.imageId));

    const handleColorClick = (item: SKUImageObject) => {
        const clickedColor = item.itemName;
        const newItem = items.find(item => item.name === clickedColor);
        const newItemImageIds = newItem?.images.map(item => item.imageId);
        if (newItemImageIds) {
            setCurrentImageIds(newItemImageIds);
        }
        setTrainState({ left: false, right: true });
        setPLPTrainIndex(0);
    }

    const sellingPriceHigh = product.priceRange.sellingPrice.highPrice;
    const sellingPriceLow = product.priceRange.sellingPrice.lowPrice;
    const sellingPriceRange = sellingPriceHigh > sellingPriceLow ? `$${sellingPriceLow.toLocaleString()}${trailingZero(sellingPriceLow.toString())} - $${sellingPriceHigh.toLocaleString()}${trailingZero(sellingPriceHigh.toString())}` : "";

    const listPriceHigh = product.priceRange.listPrice.highPrice;

    const handleTrainClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = event.currentTarget as HTMLButtonElement;
        const advance = target.dataset.direction! === "right" ? 1 : -1;

        const minBoundry = plpTrainIndex === 0;
        const maxBoundry = plpTrainIndex >= currentImageIds.length - 1;
        const haltLeft = minBoundry && advance === -1;
        const haltRight = maxBoundry && advance === 1;

        if (!haltLeft && !haltRight) {
            const tempTrainIndex = plpTrainIndex + advance
            setPLPTrainIndex(tempTrainIndex);

            const tempTrainState = trainState;
            trainState.left = tempTrainIndex !== 0;
            trainState.right = tempTrainIndex < currentImageIds.length - 1;

            setTrainState(tempTrainState);
        }
    }

    const stopBubblingUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const isGiftCard = () => {
        // @ts-ignore - categories does not exist in product type.
        if (product.categories[0].includes(stringTriggers.giftCards)) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <>
            <div className={s.plpTracks}>
                <div className={s.plpTrain} style={{ transform: `translateX(-${plpTrainIndex * resultWidth}px)` }}>
                    {currentImageIds.map((image, index) => (
                        <div key={`${index}-${image}`} className={s.plpCar}>
                            <img src={sourceString(image)} alt="" width={plpImageWidth} height={plpImageHeight} className={s.plpImage} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Train Navigation Buttons */}
            {currentImageIds.length > 1 &&
                <div onClick={stopBubblingUp} className={s.plpTrainButtonsContianer}>
                    <button onClick={handleTrainClick} data-direction="left" disabled={!trainState.left} className={s.plpTrainButton}>
                        <img src="/arquivos/sm-caret.gif" alt="Previous Image" className={s.plpCaret} style={{ transform: `rotate(-90deg)` }} />
                    </button>
                    <button onClick={handleTrainClick} data-direction="right" disabled={!trainState.right} className={s.plpTrainButton}>
                        <img src="/arquivos/sm-caret.gif" alt="Next Image" className={s.plpCaret} style={{ transform: `rotate(90deg)` }} />
                    </button>
                </div>
            }

            <h2 className={s.plpProductName}>{product.productName}</h2>
            <div className={s.plpPriceContainer}>
                {listPriceHigh > sellingPriceLow && !isGiftCard() && <s className={s.strikethroughPrice}>${listPriceHigh.toLocaleString()}{trailingZero(listPriceHigh.toString())}</s>}
                {!!sellingPriceRange ? <div className={s.sellingPriceRange}>{sellingPriceRange}</div> : <div className={s.sellingPrice}>${sellingPriceHigh.toLocaleString()}{trailingZero(sellingPriceHigh.toLocaleString())}</div>}
            </div>

            {showColorOptions &&
                <div onClick={stopBubblingUp} className={s.plpColorButtonContainer}>
                    {colorList.map((item, index) => {
                        const imageSource = sourceString(item.imageId, colorWidth, colorHeight);
                        return (
                            <button key={`${index}-${item.imageId}`} onClick={() => handleColorClick(item)} title={item.itemColor} className={s.plpColorButton}>
                                <img src={imageSource} alt={item.itemName} width={colorWidth} height={colorHeight} />
                            </button>
                        )
                    })}
                </div>
            }
        </>
    )
};

export default PLPImageColors;
