import React from "react";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

const AssemblyFeeBadge = () => {
    const productContext = useProduct();
    const productClusters = productContext?.product?.productClusters;

    const assemblyFee = productClusters?.find(productCluster => productCluster.id === "414");

    if (!assemblyFee) return <></>;

    // const handleClick = () => {

    // }

    return (
        <div className={s.shippingPromo}>
            {/* <button onClick={handleClick} className={s.assemblyFeeButton}> */}
            <div className={s.assemblyFeeText}>A $99.99 assembly fee applies to this bike when picked up in-store.</div>
            {/* </button> */}
        </div >
    )
}

export default AssemblyFeeBadge;
