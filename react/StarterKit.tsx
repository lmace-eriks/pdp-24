import React, { ReactChildren } from "react";
import { useProduct } from "vtex.product-context";

import { binarySearchParentId, sortedAventonBikeParentIdList } from "./typesData";

const starterKitIndex = (kitName: string, allStarterKits: Array<ReactChildren | any>) => allStarterKits.findIndex(item => item.props.blockProps.starterKitType === kitName);

const StarterKit = (children: ReactChildren | any) => {
    const productContext = useProduct();
    const starterKitsList = children.children;

    // Starter Kits only exist on bicycles. - LM
    // Examples: Road, Gravel, Mountain, Recreational, Electric Recreational

    // Update, we will only be looking for Aventon Ebike Parent IDs for the starter kit - 05/28/2024 - LM

    const parentId = productContext?.product?.productReference.toLowerCase();
    if (!parentId) return <></>;

    // Aventon Abound
    // if (parentId === "pr5a18908") {
    //     return <>{starterKitsList[starterKitIndex("Aventon Abound", starterKitsList)]}</>;
    // }

    const productIsAventonEbike = binarySearchParentId(parentId, sortedAventonBikeParentIdList, 0, sortedAventonBikeParentIdList.length - 1);

    if (productIsAventonEbike) return <>{starterKitsList[starterKitIndex("Aventon", starterKitsList)]}</>;

    // Demonstration only, below is not built or on the roadmap. - LM
    const productIsBmcBike = false;
    if (productIsBmcBike) return <>{starterKitsList[starterKitIndex("BMC", starterKitsList)]}</>;

    return <></>;

};

export default StarterKit;
