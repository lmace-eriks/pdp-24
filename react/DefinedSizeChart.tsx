import React, { useRef } from "react";
import { useProduct } from "vtex.product-context";
import { ProductSpecification } from "vtex.product-context/react/ProductTypes";

import { default as s } from "./styles.css";

const parseHTMLSizeChart = (hypertextString: string) => {
    if (!document) return "";

    const fakeDOM = document.createElement("body");
    fakeDOM.innerHTML = hypertextString;

    const sizeChartImageElement = fakeDOM.querySelector(".vtex-size-chart-image") as HTMLImageElement;
    if (!sizeChartImageElement) return "";

    return sizeChartImageElement.src;
}

const findAndIsolateSizeChart = (properties: ProductSpecification[] | undefined) => {
    if (!properties) return undefined;

    const sizeChartItem = properties.find(item => item.name === "Size Chart");
    if (!sizeChartItem) return undefined;

    const sizeChartValue = sizeChartItem.values[0];
    const sizeChartIsHTML = sizeChartValue.includes("<div");

    // Size Charts can exist as HTML or as a plain image source string.
    const sizeChartSource = sizeChartIsHTML ? parseHTMLSizeChart(sizeChartValue) : sizeChartValue;

    return sizeChartSource;
}

const DefinedSizeChart = () => {
    const productContext = useProduct();
    const properties = productContext?.product?.properties;

    // This app will only be called if a size chart exists in the
    // properties array, so I am skipping some error checking - LM

    const sizeChartImageSource = findAndIsolateSizeChart(properties);
    if (!sizeChartImageSource) return <></>;

    const modalRef = useRef<HTMLDialogElement>(null);

    const handleSizeToolClick = () => {
        modalRef.current?.showModal();
    }

    const handleClickBackground = (e: any) => {
        const clickX = e.clientX;
        const clickY = e.clientY;
        const modalBounds = modalRef.current?.getBoundingClientRect();
        if (!modalRef.current || !modalBounds) return;

        const backgroundBounds =
            clickX < modalBounds.left ||
            clickX > modalBounds.right ||
            clickY < modalBounds.top ||
            clickY > modalBounds.bottom;

        if (backgroundBounds) modalRef.current.close();
    }

    const handleCloseModal = () => {
        modalRef.current?.close();
    }

    return (
        <>
            <button onClick={handleSizeToolClick} className={s.sizeToolButton}>
                Size Chart
            </button>
            <dialog ref={modalRef} aria-label="Size Chart" className={s.modalContainer} onClick={handleClickBackground} >
                <div className={s.sizeChartContainer}>
                    <button aria-label="Close Dialog." onClick={handleCloseModal} className={s.modalCloseButton}>Close Size Chart</button>
                    <img src={sizeChartImageSource} alt="Size Chart" loading="lazy" className={s.sizeChartImage} />
                </div>
            </dialog>
        </>
    );
};

export default DefinedSizeChart;
