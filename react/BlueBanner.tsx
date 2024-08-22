import React from "react";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

type BannerObject = {
    bannerText: string
    bannerSubtext?: string
    bannerLink?: string
    parentList: string[]
}

const banners: BannerObject[] = [
    {
        // Abound
        bannerText: "This Bike Qualifies for Free Accessories with Purchase",
        bannerSubtext: "Learn More",
        bannerLink: "/aventon-fulfilled-promotions",
        parentList: ["PR5A23505"]
    },
    {
        // Aventure.2, Level.2, Sinch.2, Soltera.2
        bannerText: "This Bike Qualifies for a Free Accessory Bundle",
        bannerSubtext: "Learn More",
        bannerLink: "/aventon-fulfilled-promotions",
        parentList: ["PR5A18619", "PR5A22758", "PR5A17620", "PR5A17621", "PR5A19770", "PR5A20491", "PR5A22761", "PR5A20490"]
    },
    {
        // Pace 500.3
        bannerText: "This Bike Qualifies for a Free Extra Battery with Purchase",
        bannerSubtext: "Learn More",
        bannerLink: "/aventon-fulfilled-promotions",
        parentList: ["PR5A19224", "PR5A19225"]
    }
];

const BlueBanner = () => {
    const productContext = useProduct();
    const product = productContext?.product;
    if (!product) return <></>;

    const parentId = product.productReference;

    const bannerIndex = banners.findIndex(banner => banner.parentList.includes(parentId));
    if (bannerIndex === -1) return <></>;

    const { bannerText, bannerSubtext, bannerLink } = banners[bannerIndex];

    const BannerElement = bannerLink ? "a" : "div";

    const containerAttributes: any = {
        href: bannerLink || null,
        target: bannerLink ? "_blank" : null
    }

    return (
        <BannerElement className={s.blueBannerContainer} {...containerAttributes}>
            <div className={s.blueBannerText}>{bannerText}</div>
            {bannerSubtext && <div className={s.blueBannerSubtext}>{bannerSubtext}</div>}
        </BannerElement>
    );

};

export default BlueBanner;
