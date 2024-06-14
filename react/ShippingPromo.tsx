import React from "react";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

const freeShippingText = "FREE SHIPPING on this item!";
const nonContinental = "Excludes AK and HI";
const flatRate = "Flat Rate Shipping on this item!";
const freeShippingOverThresholdText = "Free Shipping on orders over $99!";
const chargeFreightText = "This item is excluded from Free Shipping Promotions";

const shippingMap = new Map<string, string>();

shippingMap.set("206", `${freeShippingText} ${nonContinental}`);
shippingMap.set("207", `$15 ${flatRate} ${nonContinental}`);
shippingMap.set("208", `$19 ${flatRate} ${nonContinental}`);
shippingMap.set("209", `$49 ${flatRate} ${nonContinental}`);
shippingMap.set("311", `$75 ${flatRate} ${nonContinental}`);
shippingMap.set("210", `$99 ${flatRate} ${nonContinental}`);
shippingMap.set("312", `$150 ${flatRate} ${nonContinental}`);

const ChargeFreightElement = () => <div className={s.chargeFreight}>{chargeFreightText}</div>;
const FreeShippingAmountElement = () => <div className={s.freeShippingThreshold}>{freeShippingOverThresholdText}</div>

const ShippingPromo = () => {
    const productContext = useProduct();
    const productClusters = productContext?.product?.productClusters;
    if (!productClusters) return <></>;

    const collectionIds = new Set();
    for (const collection of productClusters) collectionIds.add(collection.id);

    const inStoreOnly = collectionIds.has("394");
    const freeShipping = collectionIds.has("206");
    const chargeFreight = collectionIds.has("317");

    // Erik thinks these two collections are too low of a flat rate to display the promo. - LM 03/01/2024
    const hideFlatRate = collectionIds.has("207") || collectionIds.has("208");

    // For error tracking in dev tools.
    const trackingAttributes = {
        "data-collection-ids": Array.from(collectionIds.values()).join(", "),
        "data-in-store-only": inStoreOnly.toString(),
        "data-free-shipping": freeShipping.toString(),
        "data-charge-freight": chargeFreight.toString(),
        "data-hide-flat-rate": hideFlatRate.toString()
    }

    const TrackingElement = () => <div>
        In Store Only: {trackingAttributes["data-in-store-only"]} <br />
        Charge Freight: {trackingAttributes["data-charge-freight"]} <br />
        Free Shipping: {trackingAttributes["data-free-shipping"]} <br />
        Hide Flat Rate: {trackingAttributes["data-hide-flat-rate"]} <br />
        Collection Ids: {trackingAttributes["data-collection-ids"]} <br />
    </div>

    // In Store Only takes priority.
    if (inStoreOnly) return (
        <div className={s.shippingPromo} {...trackingAttributes}>
            <div className={s.shippingPromoLabel}>This item is available for In-Store Pick-Up Only</div>
        </div>
    )

    // If item has Free Shipping, we don't need to check for anything else.
    if (freeShipping) return (
        <div className={s.shippingPromo} {...trackingAttributes}>
            <div className={s.shippingPromoLabel}>{freeShippingText}</div>
            <div className={s.freeShippingThreshold}>{nonContinental}</div>
        </div>
    )

    // Flat Rate promo exists, but is too "light" to advertise. Display default messaging.
    if (hideFlatRate && !chargeFreight) return (
        <div className={s.shippingPromo} {...trackingAttributes}>
            <div className={s.shippingPromoLabel}>{freeShippingOverThresholdText}</div>
        </div>
    )

    /* Find valid shipping promo. Item should not exist in more than one
     "flat rate" collection, so terminate loop when first match is found. */
    const promoId: () => string = () => {
        for (const [collectionId] of shippingMap) {
            const promoMatch = collectionIds.has(collectionId);

            if (promoMatch) return collectionId;
        }
        return "";
    };

    // No promoId found: Item has no shipping rate.
    if (!promoId() && chargeFreight) return (
        <>
            {/* <TrackingElement /> */}
            <div className={s.shippingPromo} {...trackingAttributes} >
                <div className={s.shippingPromoLabel}>{chargeFreightText}</div>
            </div>
        </>
    );

    // Display flat rate shipping promo.
    if (promoId()) {
        return (
            <div className={s.shippingPromo} {...trackingAttributes} >
                <div className={s.shippingPromoLabel}>{shippingMap.get(promoId())}</div>
                {chargeFreight ? <ChargeFreightElement /> : <FreeShippingAmountElement />}
            </div>
        )
    } else {
        /* We shouldn't ever reach this condition except for Gift Cards
        with the current collection rules set up in VTEX. */
        return <div {...trackingAttributes} />;
    }
}

export default ShippingPromo;
