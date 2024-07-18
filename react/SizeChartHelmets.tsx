import React, { useRef } from "react";
import { useProduct } from "vtex.product-context";

import { default as s } from "./styles.css";

type SizeChartInfoObject = {
    image: string
    label: string
}

const sizeCharts: Map<string, SizeChartInfoObject> = new Map();

sizeCharts.set("default-size-chart", {
    image: "https://eriksbikeshop.vtexassets.com/arquivos/eriks-logo.svg",
    label: "Helmet Size Chart"
});

sizeCharts.set("Specialized", {
    image: "https://assets.specialized.com/i/specialized/Helmet-Size-Chart-05-06-24?w=900",
    label: "Specialized Helmet Size Chart"
});

sizeCharts.set("Smith", {
    image: "https://www.smithoptics.com/dw/image/v2/BDPZ_PRD/on/demandware.static/-/Sites-smith-master-catalog/default/dw48555748/images/product-images/forefront2-helmet/2024/forefront2-helmet_matteMidnightNavy-Sagebrush_3Q.png?sw=700&sh=700&sm=fit",
    label: "Smith Helmet Size Chart"
});

const SizeChartHelmets = () => {
    const productContext = useProduct();
    const brand = productContext?.product?.brand;
    if (!brand) return <></>;

    const sizeChartExists = sizeCharts.has(brand);
    const sc = sizeChartExists ? sizeCharts.get(brand)! : sizeCharts.get("default-size-chart")!;

    const modalRef = useRef<HTMLDialogElement>(null);

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
                {sc.label}
            </button>
            <dialog ref={modalRef} aria-label="Size Chart" className={s.modalContainer} onClick={handleClickBackground} >
                <div className={s.sizeChartContainer}>
                    <img src={sc.image} alt={`Size Chart for ${sizeChartExists ? brand : ""} Helmets`} loading="lazy" className={s.sizeChartImage} />
                    <button aria-label="Close Dialog." onClick={handleCloseModal} className={s.modalCloseButton}>Close Size Chart</button>
                </div>
            </dialog>
        </>
    );
};

export default SizeChartHelmets;
