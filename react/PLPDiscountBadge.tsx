import React from "react";
import { ProductSummaryContext } from 'vtex.product-summary-context'
const { useProductSummary } = ProductSummaryContext;

import { stringTriggers } from "./PDP24";

import { default as s } from "./styles.css";

const PLPDiscountBadge = () => {
    const { product } = useProductSummary();

    if (!product.priceRange) return <></>;

    // @ts-ignore Gift Card Exception.
    if (product.categories[0].includes(stringTriggers.giftCards)) {
        return <></>
    };

    const listPrice = product.priceRange.listPrice.highPrice;
    const sellingPrice = product.priceRange.sellingPrice.lowPrice;

    if (sellingPrice >= listPrice) return <></>;

    const discount = 100 - Math.floor((sellingPrice / listPrice) * 100);

    if (discount < 5) return <></>;

    return (
        <div className={s.discountBadge}>
            {discount}% OFF
        </div>
    )
};

export default PLPDiscountBadge;
