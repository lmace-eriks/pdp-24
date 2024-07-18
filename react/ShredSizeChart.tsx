import React, { useRef } from "react";
import { canUseDOM } from "vtex.render-runtime";
import { useProduct } from "vtex.product-context";
import { ProductSpecification } from "vtex.product-context/react/ProductTypes";

import { default as s } from "./styles.css";

const parseHTMLSizeChart = (hypertextString: string) => {
    if (!canUseDOM) return;

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
    const sizeChartHasImg = sizeChartValue.includes("<img");

    // Size Charts can exist as HTML or as a plain image source string.
    const sizeChartSource = sizeChartHasImg ? parseHTMLSizeChart(sizeChartValue) : undefined;

    return sizeChartSource;
}

const ShredSizeChart = () => {
    const productContext = useProduct();
    const properties = productContext?.product?.properties;
    if (!properties) return <></>;

    const sizeChartImageSource = findAndIsolateSizeChart(properties);
    if (!sizeChartImageSource) return <></>;

    return (
        <div className={s.sizeChartContainer}>
            <h2 className="eriksbikeshop-box-1-x-pdp-h2">Size Chart</h2>
            <img src={sizeChartImageSource} alt="Size Chart" loading="lazy" className={s.sizeChartImage} />
        </div>
    );
};

export default ShredSizeChart;
