import React from "react";
import { useOrderForm } from 'vtex.order-manager/OrderForm';
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

type BannerObject = {
    bannerText: string
    bannerSubtext?: string
    bannerLink?: string
    conditions: ConditionsObject
}

type ConditionsObject = {
    state: string
    productProperty?: string
    productCategory?: string
}

const banners: BannerObject[] = [
    {
        bannerText: "This Bike Qualifies for the MN E-Bike Rebate!",
        bannerSubtext: "Learn More",
        bannerLink: "/blog/post/minnesota-ebike-rebate-with-eriks",
        conditions: {
            state: "mn",
            productProperty: "ProductData_BikeEbikeClass"
        }
    }
];

const lowerCaseBanners = banners.map(banner => ({
    conditions: {
        state: banner.conditions.state.toLowerCase(),
        productCategory: banner.conditions.productCategory?.toLowerCase(),
        productProperty: banner.conditions.productProperty?.toLowerCase()
    }
}));

const RegionalBanner = () => {
    const { orderForm } = useOrderForm();
    const productContext = useProduct();
    const product = productContext?.product;
    if (!product) return <></>;

    if (!product.categoryTree) return <></>;

    const categoryTree = product?.categoryTree.map(category => category.name.toLowerCase());
    const properties = product?.properties?.map(property => property.name.toLowerCase());

    const shipping = orderForm?.shipping;
    if (!shipping) return <></>;

    const selectedAddress = shipping.selectedAddress;
    if (!selectedAddress) return <></>;

    const userState: string = selectedAddress.state.toLowerCase();

    let breakLoop = false;
    let stateMatch = false;
    let conditionMatch = false;
    let bannerIndex = -1;

    for (const [index, banner] of lowerCaseBanners.entries()) {
        if (breakLoop) break;

        const conditionType = banner.conditions.productCategory ? "category" : "property";

        switch (conditionType) {
            case "property": {
                const hasConditionProperty = properties.find(property => property === banner.conditions.productProperty);

                if (hasConditionProperty) {
                    conditionMatch = true;
                    stateMatch = userState === banner.conditions.state;
                    bannerIndex = index;
                }

                break;
            }

            case "category": {
                const hasCategory = categoryTree.find(category => category === banner.conditions.productCategory);

                if (hasCategory) {
                    conditionMatch = true;
                    stateMatch = userState === banner.conditions.state;
                    bannerIndex = index;
                }

                break;
            }

            default: break;
        }

        if (stateMatch && conditionMatch && bannerIndex !== -1) breakLoop = true;
    }

    if (!breakLoop) return <></>;

    const { bannerText, bannerSubtext, bannerLink } = banners[bannerIndex];

    const BannerElement = bannerLink ? "a" : "div";

    const containerAttributes: any = {
        href: bannerLink || null,
        target: bannerLink ? "_blank" : null
    }

    return (
        <BannerElement className={s.regionalBannerContainer} {...containerAttributes}>
            <div className={s.regionalBannerText}>{bannerText}</div>
            {bannerSubtext && <div className={s.regionalBannerSubtext}>{bannerSubtext}</div>}
        </BannerElement>
    );

};

export default RegionalBanner;
