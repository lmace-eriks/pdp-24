import React from "react";
import { ProductSummaryContext } from 'vtex.product-summary-context'

const { useProductSummary } = ProductSummaryContext;

import { default as s } from "./styles.css";

const StarterKitPrice = () => {
    const { product } = useProductSummary();

    const sellingPrice = product.sku.seller.commertialOffer.Price;
    const listPrice = product.sku.seller.commertialOffer.ListPrice;

    const showListPrice = listPrice > sellingPrice;

    return (
        <div className={s.starterKitPriceContainer}>
            {showListPrice && <s className={s.starterKitlistPrice}>${listPrice}</s>}
            <div className={s.starterKitSellingPrice}>${sellingPrice}</div>
        </div>
    )
};

export default StarterKitPrice;
