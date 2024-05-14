import React from "react";
import { useProduct } from 'vtex.product-context';

import { trailingZero } from "./utils";

import { default as s } from "./styles.css";

const Pricing = () => {
    const productContext = useProduct();

    const productListPrice = productContext?.selectedItem?.sellers[0].commertialOffer.ListPrice;
    const productSellingPrice = productContext?.selectedItem?.sellers[0].commertialOffer.Price;

    const displayListPrice = productSellingPrice && productListPrice && productSellingPrice < productListPrice;

    const listPriceString = productListPrice?.toLocaleString();
    const sellingPriceString = productSellingPrice?.toLocaleString();

    const listPrice = displayListPrice ? `$${listPriceString}${trailingZero(listPriceString)}` : "";
    const sellingPrice = `$${sellingPriceString}${trailingZero(sellingPriceString)}`;

    return <div className={s.priceContainer}>
        {listPrice && <s className={s.listPrice}>{listPrice}</s>}
        <div className={s.sellingPrice}>{sellingPrice}</div>
    </div>
}

export default Pricing;