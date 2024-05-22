import React from "react";
import { useProduct } from "vtex.product-context";

import { stringTriggers } from "./PDP24";
import { PointObject } from "./typesData";

import DetailsBike from "./DetailsBike";
import DetailsSnowboard from "./DetailsSnowboard";
import DetailsSki from "./DetailsSki";

export const sortDataPoints: any = (arr: Array<PointObject>) => {
    if (arr.length <= 1) return arr;

    let pivot = arr[0], leftArr = [], rightArr = [];

    for (let i = 1; i < arr.length; i++) {
        if (!arr[i]) continue;

        const itemSortPriority = arr[i].sortPriority || 10;
        const pivotSortPriority = pivot.sortPriority || 10;

        if (itemSortPriority < pivotSortPriority) {
            leftArr.push(arr[i]);
        } else {
            rightArr.push(arr[i]);
        }
    }

    return [...sortDataPoints(leftArr), pivot, ...sortDataPoints(rightArr)];
}

export const removeSpaces = (value: string) => {
    const lowerCased = value.toLowerCase();
    const allWords = lowerCased.split(" ");

    for (let index = 0; index < allWords.length; index++) {
        const word = allWords[index];
        if (word === "|") allWords.splice(index, 1);
    }

    const combineWithHypens = allWords.join("-");
    const removedApostrophes = combineWithHypens.split("'").join("");

    return removedApostrophes;
}

export const addSpaces = (value: string) => value.split("-").join(" - ");

const ProductDetails = () => {
    const productContext = useProduct();

    const productCategories = productContext?.product?.categories[0];
    if (!productCategories) return <></>; // TS

    // Determine which (if any) <Details[sport] /> to return.

    const isBike = productCategories.includes(stringTriggers.bicycles);
    if (isBike) return <DetailsBike />

    const isSnowboard = productCategories.includes(stringTriggers.snowboards);
    if (isSnowboard) return <DetailsSnowboard />

    const isSki = productCategories.includes(stringTriggers.skis);
    if (isSki) return <DetailsSki />

    return <></>;
};

export default ProductDetails;
