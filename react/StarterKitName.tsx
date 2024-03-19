import React from "react";
import { useProduct } from "vtex.product-context";

import { default as s } from "./styles.css";

const StarterKitName = () => {
    const productContext = useProduct();

    const productName = productContext?.product?.productName;

    return <div className={s.starterKitProductName}>{productName}</div>;
};

export default StarterKitName;
