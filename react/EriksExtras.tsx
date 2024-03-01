import React from "react";
import { useProduct } from "vtex.product-context";

const EriksExtras = () => {
    const productContext = useProduct();

    const properties = productContext?.product?.properties;
    const extras = properties?.find(item => item.name === "Extra")?.values[0];

    return <div dangerouslySetInnerHTML={{ __html: extras || "" }} />;
};

export default EriksExtras;
