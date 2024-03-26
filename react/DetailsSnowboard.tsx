import React, { useRef, useState } from "react";
import { useProduct } from "vtex.product-context";
import { useRuntime } from "vtex.render-runtime";

import { default as s } from "./styles.css";

import { PointObject, snowboardDataPoints, DataPoints, MoreInfoObject } from "./typesData";
import { stringTriggers } from "./PDP24";

import { removeSpaces, addSpaces } from "./ProductDetails";

const DetailsSnowboard = () => {
    const productContext = useProduct();
    const { deviceInfo } = useRuntime();
    const { isMobile } = deviceInfo;

    const productProperties = productContext?.product?.properties;

    const modalRef = useRef<HTMLDialogElement>(null);
    const [learnMore, setLearnMore] = useState<MoreInfoObject>();

    const dataPointsFromVTEX = productProperties?.filter(item => item.name.includes(stringTriggers.productData));
    if (!dataPointsFromVTEX) return <></>;

    const dataPointsToDisplay: PointObject[] = dataPointsFromVTEX.map(item => {
        const tempKey = item.name as keyof DataPoints;
        const tempItem = snowboardDataPoints[tempKey]
        const tempInfo: MoreInfoObject = tempItem?.info || { text: "", title: "", image: "" }

        return {
            label: tempItem?.label || "",
            sublabel: tempItem?.sublabel || "",
            sortPriority: tempItem?.sortPriority || 10,
            info: tempInfo,
            value: dataPointsFromVTEX.find(vtexItem => vtexItem.name === item.name)?.values[0] || ""
        }
    });

    dataPointsToDisplay.sort((a, b) => {
        const aSort = a.sortPriority || 10;
        const bSort = b.sortPriority || 10;

        if (aSort > bSort) return 1;
        if (aSort < bSort) return -1;
        return 0;
    })

    const handleMoreInfoClick = (point: PointObject) => {
        const tempMoreInfo: MoreInfoObject = {
            title: point.label,
            text: point.info?.text || ""
        }

        setLearnMore(tempMoreInfo);

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

    const PointIcon = (point: PointObject) => {
        if (!point.value) return;
        const imgDir = "/arquivos";
        const iconSrc = (imgPrefix: string, point: PointObject) => `${imgDir}/${imgPrefix}-${removeSpaces(point.value!)}.png`;

        switch (point.label) {
            case "All Style": {
                const imgPrefix = "pdc-v2-allstyle-snowboard";
                return <img src={iconSrc(imgPrefix, point)} alt="" className={s.pointIcon} width={505} height={80} style={{ maxWidth: "505px" }} />;
            }

            case "Profile": {
                const imgPrefix = "pdc-profile";
                return <img src={iconSrc(imgPrefix, point)} alt="" className={s.pointIcon} width={400} height={80} style={{ maxWidth: "400px" }} />;
            }

            case "Flex": {
                const imgPrefix = "pdc-flex";
                return <img src={iconSrc(imgPrefix, point)} alt="" className={s.pointIcon} width={400} height={40} style={{ maxWidth: "400px" }} />;
            }

            case "Rider Level": {
                const imgPrefix = "pdc";
                return <img src={iconSrc(imgPrefix, point)} alt="" className={s.pointIcon} width={450} height={80} style={{ maxWidth: "450px" }} />;
            }

            default: return <></>;
        }
    }

    const labelOutput = (point: PointObject) => {
        if (!point.value) return;

        switch (point.label) {
            case "Flex": {
                const flexNumber = Number(point.value);
                const rating = flexNumber >= 8 ? "Stiff" : (flexNumber >= 4 && flexNumber <= 7) ? "Medium" : "Soft";
                return `${flexNumber} out of 10 - ${rating}`;
            }

            case "Rider Level": {
                return addSpaces(point.value);
            }

            default: return point.value;
        }
    }

    return (
        <>
            <table className={s.pointTable}>
                <thead></thead>
                <tbody className={s.pointTableBody}>
                    {dataPointsToDisplay?.map((point, index) => (
                        <tr key={`track-${index}`} className={s.pointTrack}>
                            <th scope="row" className={s.pointHead}>
                                <div className={s.pointLabel}>{point.label}:</div>
                                {point.sublabel && <div className={s.pointSublabel}>{point.sublabel}</div>}
                            </th>
                            {isMobile ?
                                <>
                                    <td className={s.pointValueMobileText}>
                                        <div className={s.valueLabel}>{labelOutput(point)}</div>
                                    </td>
                                    <td className={s.pointValueMobileIcon}>
                                        {PointIcon(point)}
                                    </td>
                                </>
                                :
                                <td className={s.pointValue}>
                                    <div className={s.valueContainer}>
                                        <div className={s.valueLabel}>{labelOutput(point)}</div>
                                        {PointIcon(point)}
                                    </div>
                                </td>
                            }
                            <td className={s.pointMore}>{!!point.info?.text && <button onClick={() => handleMoreInfoClick(point)} className={s.learnMoreButton}>Learn More <span className={s.questionMark}>?</span></button>}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot></tfoot>
            </table>
            <dialog ref={modalRef} aria-label="Learn More" className={s.modalContainer} onClick={handleClickBackground}>
                <div className={s.modalContent}>
                    <div className={s.learnMoreTitle}>{learnMore?.title}</div>
                    <div dangerouslySetInnerHTML={{ __html: learnMore?.text || "" }} />
                    <button aria-label="Close Dialog." onClick={handleCloseModal} className={s.modalCloseButton}>Close</button>
                </div>
            </dialog>
        </>
    );
};

export default DetailsSnowboard;
