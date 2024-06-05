import React, { ReactChild, ReactChildren, useEffect, useRef, useState } from "react";
import { canUseDOM } from "vtex.render-runtime";
import { useProduct } from "vtex.product-context";

import { default as s } from "./styles.css";

type ModelObject = {
    riderEssentialsName: string
    parentIdList: Set<string>
}

// Using a Set in place of an array because set.prototype.has() lookup time is O(1).
const createSet = (arr: string[]) => {
    const mySet: Set<string> = new Set();
    for (const item of arr) mySet.add(item.toLowerCase());
    return mySet;
}

const productModels: ModelObject[] = [
    {
        riderEssentialsName: "Aventon Abound",
        parentIdList: createSet(["pr5a18908"])
    },
    {
        riderEssentialsName: "Aventon Ramblas",
        parentIdList: createSet(["pr5a21693", "pr5a22584"])
    },
    {
        riderEssentialsName: "Aventon Level",
        parentIdList: createSet(["pr5a17621", "pr5a17620", "pr3e23944"])
    },
    {
        riderEssentialsName: "Aventon Sinch",
        parentIdList: createSet(["pr5a19770", "pr5a16930", "pr5a15042", "pr3e23945"])
    },
    {
        riderEssentialsName: "Aventon Aventure",
        parentIdList: createSet(["pr5a18619", "pr5a18620", "pr5a22758", "pr3e26660", "pr3e26661"])
    },
    {
        riderEssentialsName: "Aventon Solterra/Pace",
        parentIdList: createSet(["pr5a19225", "pr5a19224", "pr5a19226", "pr5a19227", "pr5a20491", "PR5a22761", "pr5a20490"])
    },
]

const RiderEssentials = (children: ReactChildren | any) => {
    const productContext = useProduct();
    const product = productContext?.product;
    if (!product) return <></>;

    // Refs
    const observer = useRef<IntersectionObserver>();
    const reSection = useRef<HTMLElement>(null);

    // State
    const [showRiderEssentials, setShowRiderEssentials] = useState(false);

    useEffect(() => {
        if (!canUseDOM || !reSection.current || showRiderEssentials) return;

        observer.current = new IntersectionObserver(entries => {
            const reSectionElement: IntersectionObserverEntry = entries[0];
            const containerVisible = reSectionElement.isIntersecting;

            setShowRiderEssentials(containerVisible);
        }, { threshold: 0.5, rootMargin: `0px` });

        observer.current.observe(reSection.current);

        return () => {
            if (!reSection.current) return;
            observer.current?.unobserve(reSection.current);
        }
    })

    let modelIndex = -1;

    for (const [index, model] of productModels.entries()) {
        const parentList = model.parentIdList;
        const productParentId = product.productReference.toLowerCase();

        const parentIdMatch = parentList.has(productParentId);

        if (parentIdMatch) {
            modelIndex = index;
            break;
        }
    }

    if (modelIndex === -1) return <></>;

    const riderEssentialsList = children.children;

    const modelSpecificRiderEssentialIndex = riderEssentialsList.findIndex((child: ReactChild | any) => {
        const childRiderEssentialName = child.props.blockProps.riderEssentialsName;
        if (!childRiderEssentialName) return false;

        const searchingFor = productModels[modelIndex].riderEssentialsName;

        if (childRiderEssentialName === searchingFor) return true;
        return false;
    });

    if (modelSpecificRiderEssentialIndex > -1) {
        return (
            <section ref={reSection} aria-labelledby="rider-essentials-title" className={s.section} style={{ padding: "0 0.5rem" }}>
                <div className={s.sectionButton} style={{ cursor: "default" }}>
                    <h2 id="rider-essentials-title" className={s.sectionTitle}>Rider Essentials</h2>
                </div>
                {!showRiderEssentials ?
                    <div className={s.reBlankBox} />
                    :
                    <div className={s.reContainer}>
                        {riderEssentialsList[modelSpecificRiderEssentialIndex]}
                    </div>
                }

            </section>
        );
    }

    return <></>;
};

export default RiderEssentials;
