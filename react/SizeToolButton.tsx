import React, { useEffect, useState } from "react";
import { useProduct } from 'vtex.product-context';
import { Link } from "vtex.render-runtime";

import { default as s } from "./styles.css";

const SizeToolButton = () => {
    const productContext = useProduct();
    const [showSizeToolButton, setShowSizeToolButton] = useState(false);
    const [sizeToolType, setSizeToolType] = useState<"bike" | "snow" | "ski" | "">("");

    useEffect(() => {
        if (sizeToolType) return;

        const categories = productContext?.product?.categories;

        const isCycling = categories?.includes("/Cycling/Bicycles/");

        if (isCycling) {
            setShowSizeToolButton(true);
            setSizeToolType("bike");
            return;
        }

        const isSnowboarding = categories?.includes("/Winter/Snowboards/");

        if (isSnowboarding) {
            setShowSizeToolButton(true);
            setSizeToolType("snow");
            return;
        }

        const isSkiing = categories?.includes("/Winter/Skis/");

        if (isSkiing) {
            setShowSizeToolButton(true);
            setSizeToolType("ski");
            return;
        }
    })

    const textType = (productType: "bike" | "snow" | "ski" | "") => {
        if (productType === "bike") return "Bicycle";
        if (productType === "snow") return "Snowboard";
        if (productType === "ski") return "Ski";
        return "";
    }

    const linkType = (productType: "bike" | "snow" | "ski" | "") => {
        if (productType === "bike") return "/bike-sizing-tool";
        if (productType === "snow") return "/snowboard-sizing-tool";
        if (productType === "ski") return "/ski-sizing-tool";
        return "";
    }

    return showSizeToolButton &&
        <Link href={linkType(sizeToolType)} className={s.sizeToolButton}>
            {textType(sizeToolType)} Size Tool
        </Link>
}

export default SizeToolButton;
