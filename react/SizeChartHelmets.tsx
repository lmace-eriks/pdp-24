import React, { ReactChild, useRef } from "react";
import { useProduct } from "vtex.product-context";

// Helmets
import SpecializedHelmets from "./helmets/SpecializedHelmets";
import GiroHelmets from "./helmets/GiroHelmets";

const sizeCharts: Map<string, ReactChild> = new Map();

sizeCharts.set("Specialized", <SpecializedHelmets />);
sizeCharts.set("Giro", <GiroHelmets />);

const SizeChartHelmets = () => {
    const productContext = useProduct();
    const brand = productContext?.product?.brand;
    if (!brand) return <></>;

    const sizeChartComponent = sizeCharts.get(brand);
    if (!sizeChartComponent) return <></>;

    return <>{sizeChartComponent}</>;
};

export default SizeChartHelmets;
