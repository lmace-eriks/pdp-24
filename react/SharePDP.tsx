import React from "react";
import { canUseDOM } from "vtex.render-runtime";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

const SharePDP = () => {
    if (!canUseDOM) return;

    // @ts-ignore
    if (!navigator.canShare) return <></>;

    const productContext = useProduct();

    const shareData = {
        title: `${productContext?.product?.productName} at ERIK'S`,
        text: "",
        url: window.location.href
    }

    const startSharing = async () => {
        try {
            await navigator.share(shareData)
        } catch (e) {
            const cancelled = e.message === "Abort due to cancellation of share.";
            if (!cancelled) console.error(e);
        }
    }

    return (
        <aside>
            <button onClick={startSharing} className={s.shareButton}>Share This With A Friend</button>
        </aside>
    );
}

export default SharePDP;
