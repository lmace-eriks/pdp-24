import React, { useEffect, useState } from "react";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

const Pricing = () => {
    const productContext = useProduct();
    const [sellingPrice, setSellingPrice] = useState("");
    const [listPrice, setListPrice] = useState("");

    useEffect(() => {
        const productListPrice = productContext?.selectedItem?.sellers[0].commertialOffer.ListPrice;
        const productSellingPrice = productContext?.selectedItem?.sellers[0].commertialOffer.Price;

        if (productSellingPrice && productListPrice && productSellingPrice < productListPrice) {
            setListPrice(`$${productListPrice?.toLocaleString()}`);
        } else {
            setListPrice("");
        }
        setSellingPrice(`$${productSellingPrice?.toLocaleString()}` || "");
    }, [productContext]);

    return <div className={s.priceContainer}>
        {listPrice && <s className={s.listPrice}>{listPrice}</s>}
        <div className={s.sellingPrice}>{sellingPrice}</div>
    </div>
}

export default Pricing;