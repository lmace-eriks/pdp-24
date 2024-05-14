import React, { useState } from "react";
import { ProductSummaryContext } from 'vtex.product-summary-context'

const { useProductSummary } = ProductSummaryContext;

import { default as s } from "./styles.css";

const StarterKitDescription = () => {
    const { product } = useProductSummary();

    const [showDescription, setShowDescription] = useState(false);

    const stopBubblingUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <div className={s.startKitDescriptionBoxContainer} onClick={stopBubblingUp}>
            {showDescription ?
                <div className={s.startKitDescriptionBox} >
                    <div className={s.startKitDescriptionContainer} >
                        <div dangerouslySetInnerHTML={{ __html: product.description }} className={s.startKitDescriptionWrapper} />
                    </div>
                    <div className={s.closeButtonContainer}>
                        <button onClick={() => setShowDescription(false)} className={s.descriptionButton}>Close Description</button>
                    </div>
                </div>
                :
                <button onClick={() => setShowDescription(true)} className={s.descriptionButton}>Show Description</button>
            }
        </div>
    )
};

export default StarterKitDescription;
