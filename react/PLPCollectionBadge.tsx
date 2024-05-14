import React from "react";
import { useProduct } from "vtex.product-context";

import { default as s } from "./styles.css";

const scale = 0.65;

const PLPCollectionBadge = () => {
    const productContext = useProduct();

    const collectionBadges = productContext?.product?.clusterHighlights;
    if (!collectionBadges) return <></>;

    const productIsSpecialBuy = collectionBadges?.find(item => item.id === "350");

    if (productIsSpecialBuy) return (
        <div className={s.collectionBadge}>
            <img src="/arquivos/special-buy-overlay.gif" alt="This product is a Special Buy." width={120 * scale} height={96 * scale} className={s.specialBuyIconPLP} />
        </div>
    )

    return <></>;
};

export default PLPCollectionBadge;
