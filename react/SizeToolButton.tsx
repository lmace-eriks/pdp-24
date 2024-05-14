import React, { useRef } from "react";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

import { stringTriggers } from "./PDP24";

const SizeToolButton = () => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const productContext = useProduct();
    const productCategories = productContext?.product?.categories[0];
    const productProperties = productContext?.product?.properties;
    const productName = productContext?.product?.productName;

    const isCategory = (category: string) => productCategories?.includes(category);

    const BlankSpace = () => <div data-size-tool-space style={{ height: "0.5rem" }} />

    // Bikes only.
    const isBike = isCategory(stringTriggers.bicycles);
    if (!isBike) return <BlankSpace />;

    const sizeChartHTML = productProperties?.find(item => item.name === stringTriggers.sizeChart)?.values[0];

    const fakeDiv = document.createElement("div");
    fakeDiv.innerHTML = sizeChartHTML || "";

    const sizeChartImageElement: HTMLImageElement | null = fakeDiv.querySelector(".vtex-size-chart-image");

    const sizeChartImageSource = sizeChartImageElement?.src;

    const handleSizeToolClick = () => {
        modalRef.current?.showModal();
    }

    const handleClickBackground = (e: any) => {
        const clickX = e.clientX;
        const clickY = e.clientY;
        const modalBounds = modalRef.current?.getBoundingClientRect();
        if (!modalRef.current || !modalBounds) return;

        if (clickX < modalBounds.left || clickX > modalBounds.right || clickY < modalBounds.top || clickY > modalBounds.bottom) {
            modalRef.current.close();
        }
    }

    const handleCloseModal = () => {
        modalRef.current?.close();
    }

    return (
        <>
            <button onClick={handleSizeToolClick} className={s.sizeToolButton}>
                Sizing Tool
            </button>
            <dialog ref={modalRef} aria-label="Size Chart" className={s.modalContainer} onClick={handleClickBackground} >
                <div className={s.sizeChartContainer}>
                    {!!sizeChartImageSource ?
                        <img src={sizeChartImageSource} alt={`Size Chart for ${productName}`} className={s.sizeChartImage} />
                        :
                        <>
                            {/* Default Chart */}
                            <img src="/arquivos/bike-sizing-standard.gif" width={2000} height={1150} alt={`Size Chart for ${productName}`} loading="lazy" className={s.sizeChartImage} />
                            <div className={s.defaultSizeChartDisclaimer}>This is our general size chart. Some manufacurers do not provide size charts for some of their bicycles and this chart is a good starting point for finding your fit. Please keep in mind that it is possible for a rider to fit multiple sizes of bicycles comfortably. For more information, please visit our <a href="/bike-sizing" target="_blank" rel="noreferrer" className={s.defaultSizeChartDisclaimerLink} style={{ whiteSpace: "nowrap" }}>Bike Sizing Guide</a>.</div>
                        </>
                    }
                    <button aria-label="Close Dialog." onClick={handleCloseModal} className={s.modalCloseButton}>Close Size Chart</button>
                </div>
            </dialog>
        </>
    )
}

export default SizeToolButton;
