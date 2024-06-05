import React, { useEffect, useRef, useState } from "react";
import { useListContext } from 'vtex.list-context'
import { useProduct } from "vtex.product-context";
import { useRuntime } from "vtex.render-runtime";

import { default as s } from "./styles.css";

const maxProductResults = 8;
const mobileProductsPerSlide = 2;
const desktopProductsPerSlide = 4;

const ListContext = () => {
    // Hooks
    const { list: productListing } = useListContext();
    const productContext = useProduct();
    const { deviceInfo } = useRuntime();

    const product = productContext?.product;
    if (!product) return <></>;

    // State
    const [loading, setLoading] = useState(true);
    const [carWidth, setCarWidth] = useState(0);
    const [trainPosition, setTrainPosition] = useState(0);

    // Ref
    const providerRef = useRef<HTMLDivElement>(null);

    const itemsPerSlide = deviceInfo.isMobile ? mobileProductsPerSlide : desktopProductsPerSlide;

    if (productListing.length > maxProductResults) productListing.length = maxProductResults;
    const maximumTrainPosition = -1 * (carWidth * (productListing.length - itemsPerSlide));
    const hideBothNavButtons = (trainPosition === 0) && (trainPosition <= maximumTrainPosition);

    useEffect(() => {
        if (!loading) return;

        if (providerRef.current) {
            setCarWidth(providerRef.current.offsetWidth / itemsPerSlide);
            setLoading(false);
        }
    });

    const handleLocomote = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = event.currentTarget as HTMLButtonElement;
        const advance = target.dataset.direction! as "right" | "left";

        if (advance === "right") {
            const newPosiiton = trainPosition - (carWidth * itemsPerSlide);
            setTrainPosition(newPosiiton);
        }

        if (advance === "left") {
            const newPosiiton = trainPosition + (carWidth * itemsPerSlide);
            setTrainPosition(newPosiiton);
        }
    }

    return (
        <div ref={providerRef} className={s.reListContextProvider}>
            <div className={s.reTracks}>
                <div className={s.reTrain} style={{ transform: `translateX(${trainPosition}px)` }}>
                    {!loading && productListing.map(item => {
                        const Component = () => item;
                        return (
                            <div key={item.key} className={s.reCar} style={{ width: `${carWidth}px` }}>
                                <Component />
                            </div>
                        )
                    })}
                </div>
            </div>
            {!hideBothNavButtons &&
                <div className={s.reSlideButtonContainer}>
                    <button onClick={handleLocomote} disabled={trainPosition === 0} data-direction="left" className={s.reSlideButton}><img src="/arquivos/sm-caret.gif" alt="Slide Left" className={s.reButtonImage} /></button>
                    <button onClick={handleLocomote} disabled={trainPosition <= maximumTrainPosition} data-direction="right" className={s.reSlideButton}><img src="/arquivos/sm-caret.gif" alt="Slide Right" className={s.reButtonImage} /></button>
                </div>
            }
        </div>
    );
}

export default ListContext;
