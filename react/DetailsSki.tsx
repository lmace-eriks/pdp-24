import React from "react";

import { PointObject, categoryDataPoints } from "./typesData";
import { useProduct } from "vtex.product-context";

import { stringTriggers } from "./PDP24";

const DetailsSki = () => {
    const productContext = useProduct();
    const productProperties = productContext?.product?.properties;

    return (<div>Ski Details</div>);
};

export default DetailsSki;
