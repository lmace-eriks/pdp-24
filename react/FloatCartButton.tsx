import React, { useEffect, useState, ReactChildren, useRef } from "react";
import { canUseDOM, useRuntime } from "vtex.render-runtime";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

type SelectedItem = {
    name: string
    values: Array<string>
}

import { ImageSourceObject } from "./typesData";

const pdpImageWidth = 600;
const pdpImageHeight = 600;

// You may replace either length dimension with auto.
const sourceString = (imageParameters: ImageSourceObject) =>
    `/arquivos/ids/${imageParameters.id}-${imageParameters.width || pdpImageWidth}-${imageParameters.height || pdpImageHeight}?quality=${imageParameters.quality || 100}`;

const FloatCartButton = ({ children }: { children: ReactChildren | any }) => {
    // Hooks
    const productContext = useProduct();
    const runtime = useRuntime();

    // Refs
    const observer = useRef<IntersectionObserver>();

    // State
    const [showFloatContainer, setShowFloatContainer] = useState(false);
    const [productSelections, setProductSelections] = useState<Array<SelectedItem>>([]);
    const [dismissedFloat, setDismissedFloat] = useState(false);

    useEffect(() => {
        if (!canUseDOM || dismissedFloat) return;

        // Select Add To Cart button.
        const atcElement = document.querySelector(`#main-pdp-atc`);
        if (!atcElement) return;

        // Are all SKU variations selected?
        const allOptionsSelected = productContext?.skuSelector?.areAllVariationsSelected;

        const isMobile = runtime.deviceInfo.isMobile;

        if (!allOptionsSelected || isMobile) {
            setShowFloatContainer(false);
            return;
        }

        observer.current = new IntersectionObserver(entries => {
            const entry: IntersectionObserverEntry = entries[0];
            const atcVisible = entry.isIntersecting;

            setShowFloatContainer((!atcVisible) ? true : false);
        }, { threshold: 1, rootMargin: `0px` });

        observer.current.observe(atcElement);

        return () => {
            observer.current?.unobserve(atcElement);
        }
    });

    useEffect(() => {
        if (!showFloatContainer || dismissedFloat) return;

        const selectedItemVariations = productContext?.selectedItem?.variations as SelectedItem[];
        setProductSelections(selectedItemVariations);
    }, [showFloatContainer]);

    const handleCloseFloatClick = () => {
        setDismissedFloat(true);
        setShowFloatContainer(false);
    }

    if (!children[0]) {
        console.error("App requires an add-to-cart VTEX app as a child.");
        return <></>;
    }

    const AddToCartButton = () => children[0];

    return (
        <div aria-hidden="true" className={s.floatContainer} data-inactive={!showFloatContainer}>
            <div className={s.floatWrapper}>
                <button onClick={handleCloseFloatClick} title="Close Add To Cart Window" className={s.floatClose}>
                    X
                </button>
                <img src={sourceString({ id: productContext?.selectedItem?.images[0].imageId || "", width: 100, height: 100, quality: 5 })} width={100} height={100} />
                <div className={s.floatTitleAndDetails}>
                    <div className={s.floatProductTitle}>{productContext?.product?.productName}</div>
                    <div className={s.floatProductDetails}>
                        {productSelections.map(variation => (
                            <div key={variation.name} className={s.floatDetailItem}>
                                <span className={s.floatDetailName}>{variation.name}:</span> <span className={s.floatDetailValue}>{variation.values[0]}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <AddToCartButton />
            </div>
        </div>
    )
}

export default FloatCartButton;
