import React, { useEffect, useRef } from "react";
import { canUseDOM } from "vtex.render-runtime";

import { default as s } from "./styles.css";

const PLPNotFound = () => {
    if (!canUseDOM) return;

    const targetElement = useRef<HTMLElement | Node>(document.querySelector(".vtex-search-result-3-x-notFound--layout"));
    const defaultFlag = useRef(false);

    const config = { attributes: false, childList: true, subtree: false };

    const callBack = (mutationList: Array<any>) => {
        console.info("GO")

        return;

        if (defaultFlag.current) return;

        for (const mutation of mutationList) {

        }
    }

    // Create / Destroy Mutation Observer
    useEffect(() => {
        const observer = new MutationObserver(callBack);
        if (!targetElement.current) return;

        observer.observe(targetElement.current, config);

        return () => observer.disconnect();
    }, []);

    return <div className={s.priceContainer}>
        OPE!
    </div>
}

export default PLPNotFound;