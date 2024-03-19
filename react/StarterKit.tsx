import React, { ReactChildren } from "react";
import { useProduct } from "vtex.product-context";

import { stringTriggers } from "./PDP24";

const StarterKit = (children: ReactChildren | any) => {
    const productContext = useProduct();
    const starterKitsList = children.children;

    // Starter Kits only exist on bicycles. - LM
    // Examples: Road, Gravel, Mountain, Recreational, Electric Recreational
    // Look for specific parentID to display specific starter kit - Will want eventually so I should build it.

    const productProperties = productContext?.product?.properties!;
    const bicycleBestUse = productProperties.find(item => item.name === stringTriggers.bikeBestUse)?.values[0]!;
    if (!bicycleBestUse) return <></>;

    const kitMatchIndex = starterKitsList.findIndex((item: any) => item.props.blockProps.starterKitType === bicycleBestUse);
    if (kitMatchIndex === -1) return <></>;

    return <>{starterKitsList[kitMatchIndex]}</>;
};

export default StarterKit;