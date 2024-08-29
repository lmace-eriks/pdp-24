import React from "react";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";
import { canUseDOM } from "vtex.render-runtime";

type BannerObject = {
    __editorItemTitle?: string
    bannerType: "none" | "collection" | "parentList"
    collection?: number
    parentList?: string
    bannerText: string
    bannerSubtext?: string
    bannerLink?: string
}

const BlueBanner = () => {
    if (!canUseDOM) return <></>;

    // @ts-ignore bluePDPBanners does not exist on window.
    const banners: BannerObject[] = window.bluePDPBanners;

    const productContext = useProduct();
    const product = productContext?.product;
    if (!product) return <></>;

    const parentId = product.productReference.toUpperCase();

    let bannerIndex = -1;

    // Search parentList first.
    const parentListBannerIndex = banners.findIndex(banner => {
        if (banner.bannerType === "parentList") {
            return banner.parentList?.includes(parentId) ? true : false
        }
        return false;
    });

    if (parentListBannerIndex > -1) {
        bannerIndex = parentListBannerIndex;
    } else {
        // Search collections
        const productCollections = product.productClusters.map(cluster => Number(cluster.id));
        if (productCollections.length === 0) return <></>;

        const collectionBannerIndex = banners.findIndex(banner => {
            if (banner.bannerType === "collection") {
                return productCollections.includes(banner.collection!);
            }
            return false;
        });

        if (collectionBannerIndex > -1) bannerIndex = collectionBannerIndex;
    }

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
