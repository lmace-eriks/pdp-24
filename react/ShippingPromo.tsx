import React from "react";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

type ShippingCollectionObject = {
    id: string
    label: string,
}

const nonContinental = "Excludes AK and HI";
const flatRate = "Flat Rate Shipping on this item!";
const inStoreOnlyText = "This item is available for In-Store Pick-Up Only";
const freeShippingOverThresholdText = "Free Shipping on orders over $99!";
const chargeFreightText = "This item is excluded from Free Shipping Promotions";

const shippingPromoCollections: Array<ShippingCollectionObject> = [
    {
        id: "206",
        label: `FREE SHIPPING on this item! ${nonContinental}`
    },
    {
        id: "207",
        label: `$15 ${flatRate} ${nonContinental}`
    },
    {
        id: "208",
        label: `$19 ${flatRate} ${nonContinental}`
    },
    {
        id: "209",
        label: `$49 ${flatRate} ${nonContinental}`
    },
    {
        id: "311",
        label: `$75 ${flatRate} ${nonContinental}`
    },
    {
        id: "210",
        label: `$99 ${flatRate} ${nonContinental}`
    },
    {
        id: "312",
        label: `$150 ${flatRate} ${nonContinental}`
    },
    {
        id: "317",
        label: chargeFreightText
    }
];

const ShippingPromo = () => {
    const productContext = useProduct();
    const productClusters = productContext?.product?.productClusters;
    const productProperties = productContext?.product?.properties;

    const chargeFreight = productClusters?.some(item => item.id === "317");

    // Check for inStoreOnly first.
    const promoText = productProperties?.find(prop => prop.name === "PDP-Promo")?.values[0];
    const inStoreOnly = promoText?.includes(inStoreOnlyText);

    // Search for any id inside shippingPromoCollections.
    const validShippingPromo = shippingPromoCollections.find(shipId => {
        return productClusters?.find(item => item.id === shipId.id);
    });

    // Erik thinks these two collections are too low of a flat rate to display the promo. - LM 03/01/2024
    const hideFlatRate = validShippingPromo?.id === "207" || validShippingPromo?.id === "208";

    const ChargeFreightElement = () => <div className={s.chargeFreight}>{chargeFreightText}</div>;
    const FreeShippingThresholdElement = () => <div className={s.freeShippingThreshold}>{freeShippingOverThresholdText}</div>;

    // Render "In Store" Text.
    if (inStoreOnly) return (
        <div className={s.shippingPromo} data-promo-type="in-store-only">
            <div className={s.shippingPromoLabel}>{inStoreOnlyText}</div>
        </div>
    )

    // Render Free Shipping Over Threshold, without flat rate.
    if (hideFlatRate && validShippingPromo && !chargeFreight) return (
        <div className={s.shippingPromo} data-promo-type={`free-shipping-threshold-collection-id-${validShippingPromo.id}`} data-charge-freight={chargeFreight}>
            <div className={s.shippingPromoLabel}>{freeShippingOverThresholdText}</div>
        </div>
    )

    // Render Shipping Promo.
    if (validShippingPromo) return (
        <div className={s.shippingPromo} data-promo-type={`collection-id-${validShippingPromo.id}`} data-charge-freight={chargeFreight}>
            <div className={s.shippingPromoLabel}>{validShippingPromo.label}</div>
            {chargeFreight ? <ChargeFreightElement /> : validShippingPromo.id !== "206" && <FreeShippingThresholdElement />}
        </div>
    )

    // Render Free Shipping.
    if (!promoText && !chargeFreight) return (
        <div className={s.shippingPromo} data-promo-type="no-freight-no-promo">
            <FreeShippingThresholdElement />
        </div>
    );

    if (promoText) {
        // Strip HTML
        const fakeDiv = document.createElement("div");
        fakeDiv.innerHTML = promoText;
        const outputPromo = fakeDiv.innerText;

        // Render Promo Text
        return (
            <div className={s.shippingPromo} data-promo-type={`text-promo-${chargeFreight ? "freight" : "no-freight"}`}>
                <div className={s.shippingPromoLabel}>{outputPromo}</div>
                {chargeFreight ? <ChargeFreightElement /> : <FreeShippingThresholdElement />}
            </div>
        )
    }

    return <></>;
}

export default ShippingPromo;
