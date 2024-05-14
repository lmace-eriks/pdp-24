import React from "react";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

const EriksProductNumber = () => {
    const productContext = useProduct();
    const selectedItem = productContext?.selectedItem;

    if (!selectedItem) return <aside className={s.productNumber} />;

    const referenceId: string = selectedItem.referenceId[0].Value;
    const productName: string = selectedItem.name;

    const ebsProductNumber = `${referenceId} - ${productName}`;

    return (
        <aside aria-label="Erik's Product Number" aria-hidden="true" data-flex-vc className={s.productNumber}>
            {ebsProductNumber}
        </aside>
    );
}

export default EriksProductNumber;
