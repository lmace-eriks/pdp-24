import React, { ReactChildren, useEffect, useState } from "react";
import { useProduct } from 'vtex.product-context';
import { Helmet, canUseDOM, useRuntime } from 'vtex.render-runtime';

import { default as s } from "./styles.css";

import { ImageSourceObject } from "./typesData";

const pdpImageWidth = 600;
const pdpImageHeight = 600;

// You may replace either length dimension with auto.
const sourceString = (imageParameters: ImageSourceObject) =>
    `https://eriksbikeshop.vtexassets.com/arquivos/ids/${imageParameters.id}-${imageParameters.width || pdpImageWidth}-${imageParameters.height || pdpImageHeight}?quality=${imageParameters.quality || 100}`;

const ProductMainImage = ({ children }: { children: ReactChildren | any }) => {
    const productContext = useProduct();
    const { deviceInfo: { isMobile } } = useRuntime();

    const [displayChildren, setDisplayChildren] = useState(false);

    const firstImageId = productContext?.selectedItem?.images[0].imageId;
    const lowQualityFirstImageSrc = sourceString({ id: firstImageId || "", quality: 1 });

    useEffect(() => {
        if (!canUseDOM || displayChildren) return;

        const skuSelector = document.querySelector(`.vtex-store-components-3-x-skuSelectorContainer--pdp-24`);
        if (!displayChildren) skuSelector?.addEventListener("mouseover", handleSKUHover);

        return () => skuSelector?.removeEventListener("mouseover", handleSKUHover);
    })

    useEffect(() => {
        if (!canUseDOM || displayChildren) return;

        window.addEventListener("touchstart", handleTouch);
        return () => window.removeEventListener("touchstart", handleTouch);
    })

    const handleTouch = () => {
        setDisplayChildren(true);
    }

    const handleSKUHover = () => {
        setDisplayChildren(true);
    }

    const flipToChildren = () => {
        setDisplayChildren(true);
    }

    // Component initially loads a very low resolution image for the LCP metric.
    // Once the user interacts with the SKU selector or Image section, we swap
    // to the VTEX native Photo Gallery App. - LM

    if (displayChildren) return <>{children}</>

    const altText = productContext?.product?.productName;

    return (
        <>
            {/* @ts-expect-error TS does not recognise <Helmet /> */}
            <Helmet>
                <link rel="preload" as="image" href={lowQualityFirstImageSrc} />
            </Helmet>

            <div className={s.mainImageContainer} onMouseEnter={flipToChildren}>
                <div className={s.lowResLCPContainer}>
                    {/* @ts-expect-error TS does not recognise fetchPriority */}
                    <img src={lowQualityFirstImageSrc} alt={altText} loading="eager" fetchPriority="high" width={pdpImageWidth} height={pdpImageHeight} className={s.lowResLCP} />
                </div>
                {!isMobile &&
                    <div className={s.skeletonThumbnailsContainer}>
                        <div className={s.skeletonThumbnail} />
                        <div className={s.skeletonThumbnail} />
                        <div className={s.skeletonThumbnail} />
                    </div>
                }
            </div>
        </>
    );
}

export default ProductMainImage;
