import React from "react";
import { useProduct } from "vtex.product-context";
import { stringTriggers } from "./PDP24";

const EriksExtras = () => {
    const productContext = useProduct();

    const properties = productContext?.product?.properties;
    const extras = properties?.find(item => item.name === stringTriggers.eriksExtras)?.values[0];

    return <div dangerouslySetInnerHTML={{ __html: extras || "" }} />;
};

export default EriksExtras;
