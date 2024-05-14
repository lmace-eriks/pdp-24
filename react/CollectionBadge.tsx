import React, { useEffect, useState } from "react";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

type Badge = {
    id: string
    width: number
    height: number
    fileName: string
    altText: string
}

const specialBuy: Badge = {
    id: "350",
    width: 120,
    height: 96,
    fileName: "special-buy-overlay.gif",
    altText: "This is a Special Buy product"
}

const CollectionBadge = () => {
    const productContext = useProduct();
    const highlights = productContext?.product?.clusterHighlights;

    const isSpecialBuy = !!highlights?.find(item => item.id === specialBuy.id);
    if (isSpecialBuy) {
        return <img src={`/arquivos/${specialBuy.fileName}`} alt={specialBuy.altText} data-collection-id={specialBuy.id} width={specialBuy.width} height={specialBuy.height} className={s.collectionBadge} />
    }

    return <></>;
}

export default CollectionBadge;
