import React from "react";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

const ProductName = () => {
    const productContext = useProduct();

    return <h1 className={s.productName}>{productContext?.product?.productName}</h1>
}

export default ProductName;
