import React, { useState } from "react";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

const EriksProductNumber = () => {
    const productContext = useProduct();
    const selectedItem = productContext?.selectedItem;
    const [copied, setCopied] = useState(false);

    if (!selectedItem) return <aside className={s.productNumber} />;

    const referenceId: string = selectedItem.referenceId[0].Value;
    const productName: string = selectedItem.name;

    const ebsProductNumber = `${referenceId} - ${productName}`;

    const sendToClipboard = () => {
        navigator.clipboard.writeText(referenceId);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
        <aside onMouseDown={sendToClipboard} aria-label="Erik's Product Number" aria-hidden="true" data-flex-vc className={s.productNumber}>
            {ebsProductNumber} {copied && <div style={{ fontWeight: "bold", paddingLeft: "1rem" }}>Copied EK Number to Clipboard!</div>}
        </aside>
    );
}

export default EriksProductNumber;
