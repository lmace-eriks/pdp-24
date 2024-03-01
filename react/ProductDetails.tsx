import React from "react";

import { PointObject, categoryDataPoints } from "./typesData";
import { useProduct } from "vtex.product-context";

import { stringTriggers } from "./PDP24";

const ProductDetails = () => {
    const productContext = useProduct();

    const productProperties = productContext?.product?.properties;
    const productCategories = productContext?.product?.categories[0];
    if (!productCategories || !productProperties) return <></>;

    const isBike = productCategories.includes(stringTriggers.bicycles);
    const isSnowboard = productCategories.includes(stringTriggers.snowboards);
    const isSki = productCategories.includes(stringTriggers.skis);
    if (!isBike && isSnowboard && isSki) return <></>;

    const productCategory = isBike ? "bicycles" : isSnowboard ? "snowboards" : isSki ? "skis" : "";
    if (!productCategory) return <></>;

    // From Product Context.
    const fpDataPoints = productProperties.filter(item => item.name.includes(stringTriggers.productData));
    if (!fpDataPoints) return <></>;

    // Category Specific: Bike, Snowboard or Ski.
    const csDataPoints = categoryDataPoints[productCategory as keyof PointObject];

    const dataPointsToDisplay: Array<PointObject> = fpDataPoints.map(item => {
        const tempKey = item.name as keyof PointObject;
        const tempObject: PointObject = csDataPoints[tempKey];

        return {
            label: tempObject.label,
            sublabel: tempObject.sublabel,
            info: tempObject.info,
            sortPriority: tempObject.sortPriority,
            value: item.values[0]
        }
    })

    if (!dataPointsToDisplay) return <></>;

    return (
        <ul>
            {dataPointsToDisplay.map(item => (
                <li key={item.label}>
                    {item.label}: {item.value}
                </li>
            ))}
        </ul>
    );
};

export default ProductDetails;
