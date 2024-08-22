import React from "react";
import { useProduct } from "vtex.product-context";

import DefinedSizeChart from "./DefinedSizeChart";
import SizeChartHelmets from "./SizeChartHelmets";
import SizeToolButton from "./SizeToolButton";

const sizeCharts: Map<string, JSX.Element> = new Map();

sizeCharts.set("Helmets", <SizeChartHelmets />);

const SizeChartPicker = () => {
    const productContext = useProduct();
    const properties = productContext?.product?.properties;

    // Fix this later. - LM 07/18/2024
    if (properties) {
        const sizeChartItem = properties.find(item => item.name === "Size Chart");
        if (sizeChartItem) {
            // if (sizeChartItem.values[0].includes("<img")) return <DefinedSizeChart />;
        }
    }

    // If no specically defined size chart exists, fallback to 
    // default category size chart picker.

    const categoryTree = productContext?.product?.categoryTree;
    if (!categoryTree) return <></>;

    if (categoryTree[0].name === "Gift Cards") return <></>;

    const isBicycle = categoryTree[1].name === "Bicycles";
    if (isBicycle) return <SizeToolButton />;

    const ultimateCategory = categoryTree[categoryTree.length - 1].name;

    const sizeChartCategoryExists = sizeCharts.has(ultimateCategory);
    if (!sizeChartCategoryExists) return <></>;

    return sizeCharts.get(ultimateCategory);
};

export default SizeChartPicker;
