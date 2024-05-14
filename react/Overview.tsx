import React, { useState } from "react";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

const Overview = () => {
    const productContext = useProduct();

    const productOverview = productContext?.product?.items[0].complementName;
    if (!productOverview) return <></>

    const overviewHasMarkUp = productOverview.includes("<div");

    return overviewHasMarkUp ? <div dangerouslySetInnerHTML={{ __html: productOverview }} className={s.productOverview} /> : <></>
}

export default Overview;