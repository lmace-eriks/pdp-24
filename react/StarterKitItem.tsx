import React from "react";
import { useProduct } from "vtex.product-context";

import { default as s } from "./styles.css";

// You may replace either dimension with auto.
const sourceString = (id: string, width: number = 500, height: number = 500) => `/arquivos/ids/${id}-${width}-${height}`

const starterKitImageWidth = 175;
const starterKitImageHeight = starterKitImageWidth;

const StarterKitItem = () => {
    const productContext = useProduct();

    const imageId = productContext?.product?.items[0].images[0].imageId;
    const productName = productContext?.product?.productName;
    // Items SHOULD be single SKU so this is the only price that SHOULD exist.
    const sellingPrice = productContext?.product?.priceRange.sellingPrice.highPrice || 0;
    const listPrice = productContext?.product?.priceRange.listPrice.highPrice || 0;

    const showListPrice = listPrice > sellingPrice;

    const imageSrc = sourceString(imageId || "", starterKitImageWidth, starterKitImageHeight);

    return (
        <>
            <img src={imageSrc} alt={productName} width={starterKitImageWidth} height={starterKitImageHeight} className={s.starterKitImage} />
            <div className={s.starterKitProductName}>{productContext?.product?.productName}</div>
            {showListPrice && <s className={s.starterKitlistPrice}>${listPrice}</s>}
            <div className={s.starterKitSellingPrice}>${sellingPrice}</div>
        </>
    )
};

export default StarterKitItem;
