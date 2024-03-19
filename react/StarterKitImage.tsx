import React from "react";
import { useProduct } from "vtex.product-context";

import { default as s } from "./styles.css";

// You may replace either dimension with auto.
const sourceString = (id: string, width: number = 500, height: number = 500) => `/arquivos/ids/${id}-${width}-${height}`

const starterKitImageWidth = 175;
const starterKitImageHeight = starterKitImageWidth;

const StarterKitImage = () => {
    const productContext = useProduct();

    // const imageId = productContext?.product?.items[0].images[0].imageId;
    const imageId = productContext?.selectedItem?.images[0].imageId;
    const productName = productContext?.product?.productName;

    const imageSrc = sourceString(imageId || "", starterKitImageWidth, starterKitImageHeight);

    return (
        <>
            <img src={imageSrc} alt={productName} width={starterKitImageWidth} height={starterKitImageHeight} className={s.starterKitImage} />
        </>
    )
};

export default StarterKitImage;
