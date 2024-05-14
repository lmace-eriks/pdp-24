import React, { useRef } from "react";
import { useProduct } from 'vtex.product-context';
import { useRuntime } from 'vtex.render-runtime'

import { stringTriggers } from "./PDP24";

import { default as s } from "./styles.css";

const EriksCare = () => {
    const productContext = useProduct();
    const { navigate } = useRuntime();

    const modalRef = useRef<HTMLDialogElement>(null);

    const productCategories = productContext?.product?.categories;
    const isBicycle = !!productCategories?.find(category => category.includes(stringTriggers.bicycles));

    if (!isBicycle) return <></>;

    const showCareModal = () => {
        modalRef.current?.showModal();
    }

    const handleClickBackground = (e: any) => {
        const clickX = e.clientX;
        const clickY = e.clientY;
        const modalBounds = modalRef.current?.getBoundingClientRect();
        if (!modalRef.current || !modalBounds) return;

        if (clickX < modalBounds.left || clickX > modalBounds.right || clickY < modalBounds.top || clickY > modalBounds.bottom) {
            modalRef.current.close();
        }
    }

    const handleCloseModal = () => {
        modalRef.current?.close();
    }

    const handleNavigateToPlans = () => {
        window.open("/bike-service-plans", "_blank");
        handleCloseModal();
    }


    return (
        <>
            <button onClick={showCareModal} className={s.eriksCareButton}>
                <img src="/arquivos/eriks-care-icon.png" width={121} height={80} className={s.eriksCareIcon} />
                <div className={s.eriksCareText}>Learn More</div>
            </button>
            <dialog ref={modalRef} aria-label="Learn More" className={s.modalContainer} onClick={handleClickBackground}>
                <div className={s.modalContent}>
                    <div className={s.learnMoreTitle}>ERIK'S Care Bike Service Plans</div>
                    <p>Bicycles are designed to last a long time as long as you keep them in good condition. Let us help! Keep your bike in peak performance with ERIK'S Care one or two-year service plans - and save money on service costs!</p>
                    <div className={s.eriksCareModalButtonContainer}>
                        <button data-ebs-red-button onClick={handleNavigateToPlans}>See Plan Details</button><button aria-label="Close Dialog." onClick={handleCloseModal} className={s.modalCloseButton}>Close</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default EriksCare;
