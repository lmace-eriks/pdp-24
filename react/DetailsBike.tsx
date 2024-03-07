import React from "react";

import { PointObject, categoryDataPoints } from "./typesData";
import { useProduct } from "vtex.product-context";

import { stringTriggers } from "./PDP24";

const DetailsBike = () => {
    const productContext = useProduct();
    const productProperties = productContext?.product?.properties;

    return (<div>Bike Details</div>);
};

export default DetailsBike;
