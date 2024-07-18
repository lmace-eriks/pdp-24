import React, { useRef, useState } from "react";
import { useProduct } from "vtex.product-context";

import { default as s } from "./styles.css";

// Data and Functions
import { bikeDetailsMap, buildDataPointMap } from "./typesData";
import { sortDataPoints } from "./ProductDetails";

// Types
import { PointObject, MoreInfoObject } from "./typesData";

const DetailsBike = () => {
    const productContext = useProduct();
    const productProperties = productContext?.product?.properties;
    if (!productProperties) return <></>;

    const modalRef = useRef<HTMLDialogElement>(null);
    const [learnMore, setLearnMore] = useState<MoreInfoObject>();

    // Map() of valid Product Data Points along with their value.
    const dataPointValueMap = buildDataPointMap(productProperties);
    if (!dataPointValueMap) return <></>;

    const bikeProductDataMap = bikeDetailsMap();

    // Populate unsortedMapData[] with all relevant info from bikeProductDataMap.
    const unsortedMapData: PointObject[] = [...dataPointValueMap].map(([dataPoint, value]) => {
        const tempInfo: MoreInfoObject = bikeProductDataMap.get(dataPoint)?.info || { text: "", title: "", image: "" };

        return {
            label: bikeProductDataMap.get(dataPoint)?.label || "",
            sublabel: bikeProductDataMap.get(dataPoint)?.sublabel || "",
            sortPriority: bikeProductDataMap.get(dataPoint)?.sortPriority || 10,
            info: tempInfo,
            value
        };
    });

    const dataPointsToDisplay: PointObject[] = sortDataPoints(unsortedMapData);

    const handleMoreInfoClick = (point: PointObject) => {
        // Marketing last minute wanted specific text descriptions for some "Learn More"
        // modals depending on category. So we need to compute this extra logic. - LM

        const productCategory = productContext?.product?.categoryTree[productContext?.product?.categoryTree.length - 1].name.toLowerCase();
        const productIsElectric = !!dataPointsToDisplay.find(item => item.label === "ProductData_BikeEbikeClass");

        const categoryLearnMore = productCategory === "mountain" ? point.info?.mountainText :
            productCategory === "road" ? point.info?.roadText :
                productCategory === "recreational" ? point.info?.recText : "";

        const electricLearnMore = point.info?.electricText;

        const learnMoreTextOutput = productIsElectric ? electricLearnMore : categoryLearnMore;

        const tempMoreInfo: MoreInfoObject = {
            title: point.label,
            text: learnMoreTextOutput || point.info?.text || ""
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

    const PointIcon = (label: string, value: string | undefined) => {
        if (!value) return;

        const imgDir = "/arquivos";

        switch (label) {
            case "Top Speed": {
                const imageOne = "top-speed-left.png";
                const valueWithoutUnit = value.toLowerCase().split("mph")[0];

                return (
                    <figure className={s.topSpeedFigure}>
                        <figcaption data-sr-only>{value} Top Speed</figcaption>
                        <div className={s.topSpeedValueImage}>
                            <img src={`${imgDir}/${imageOne}`} loading="lazy" alt="" width={102} height={100} className={s.blockImage} />
                            <div className={s.topSpeedValue}>
                                {valueWithoutUnit}
                            </div>
                        </div>
                        <div className={s.topSpeedLabel}>
                            Top<br />Speed
                        </div>
                    </figure>
                )
            }

            case "Battery Range": {
                const imageOne = "range-top.png";

                return (
                    <figure className={s.batteryRangeFigure}>
                        <figcaption data-sr-only>{value} Mile Range</figcaption>
                        <div className={s.batteryRangeValueImage}>
                            <img src={`${imgDir}/${imageOne}`} loading="lazy" alt="" width={214} height={60} className={s.blockImage} />
                            <div className={s.batteryRangeValue}>
                                {value} Mile Range
                            </div>
                        </div>
                    </figure>
                )
            }

            case "Motor Power": {
                const imageOne = "motor-power-left.png";

                return (
                    <figure className={s.motorPowerFigure}>
                        <figcaption data-sr-only>{value} Watts Motor Power</figcaption>
                        <div className={s.motorPowerValueImage}>
                            <img src={`${imgDir}/${imageOne}`} loading="lazy" alt="" width={68} height={100} className={s.blockImage} />
                            <div className={s.motorPowerValue}>
                                <div className={s.motorPowerText}>{value}W</div>
                                <div className={s.motorPowerLabel}>Motor Power</div>
                            </div>
                        </div>
                    </figure>
                )
            }

            case "Battery Size": {
                const imageOne = "battery-size-top-v2.png";
                return (
                    <figure className={s.batterySizeFigure}>
                        <figcaption data-sr-only>{value} Watt Hours</figcaption>
                        <div className={s.batterySizeValueImage}>
                            <img src={`${imgDir}/${imageOne}`} loading="lazy" alt="" width={139} height={60} className={s.blockImage} />
                            <div className={s.batterySizeValue}>
                                {value}Wh
                            </div>
                        </div>
                        <div className={s.batterySizeLabel}>Battery Size</div>
                    </figure>
                )
            }

            case "Intended Use": {
                // Category Tree is often undefined on first render attempt.
                if (!productContext?.product?.categoryTree) return;

                const tempKey = value.toLowerCase();
                let productCategory = productContext?.product?.categoryTree[productContext?.product?.categoryTree.length - 1].name.toLowerCase()!;

                // Edge case for some bikes.
                if (productCategory === "cyclocross") productCategory = "road";

                const imageHashMap: any = {
                    road: {
                        endurance: "road-intended-use-endurance.png",
                        performance: "road-intended-use-performance.png",
                        "gravel race": "road-intended-use-gravel-race.png",
                        "gravel adventure": "road-intended-use-gravel-adventure.png"
                    },
                    recreational: {
                        comfort: "rec-intended-use-comfort.png",
                        fitness: "rec-intended-use-fitness.png",
                        mountain: "rec-intended-use-mountain.png",
                        road: "rec-intended-use-road.png"
                    }
                }

                const hashMapCategory = imageHashMap[productCategory];
                if (!hashMapCategory) return <>{value}</>;

                const iuImageSource = hashMapCategory[tempKey];
                if (!iuImageSource) return <>{value}</>

                return (
                    <figure className={s.intendedUseFigure}>
                        <figcaption className={s.intendedUseFigcaption}>{value}</figcaption>
                        <img src={`${imgDir}/${iuImageSource}`}
                            loading="lazy" alt="" width={335} height={80} className={s.blockImage} />
                    </figure>
                )
            }

            case "Intended Surface": {
                const fileName = value === "Paved & Unpaved" ? "both" : value;

                return (
                    <figure className={s.intendedUseFigure}>
                        <figcaption className={s.intendedUseFigcaption}>{value}</figcaption>
                        <img src={`/arquivos/surface-${fileName.toLowerCase()}.png`} width={225} height={80} />
                    </figure>
                )
            }

            case "EBike Classification": {
                const classNumber = Number(value.split(" ")[1]);

                return (
                    <figure className={s.intendedUseFigure}>
                        <figcaption className={s.intendedUseFigcaption}>{value}</figcaption>
                        <img src={`${imgDir}/ebike-class-${classNumber}.png`} loading="lazy" alt="" width={250} height={80} className={s.blockImage} />
                    </figure>
                )
            }

            case "Number of Gears": {
                const cleanGears = value.toLowerCase().replace("x", " x ");
                return (<>{cleanGears}</>);
            }

            case "Tire Size": {
                const cleanTires = value.toLowerCase().replace("x", " x ");
                return (<>{cleanTires}</>);
            }

            case "Front Suspension": {

                return (
                    <figure className={s.suspensionFigure}>
                        <img src={`${imgDir}/bike-pdp-suspension-front.png`} loading="lazy" width={80} height={80} style={{ display: "block" }} />
                        {value}
                        <figcaption data-sr-only>{value} Front Suspension Travel</figcaption>
                    </figure>
                )
            }

            case "Rear Suspension": {

                return (
                    <figure className={s.suspensionFigure}>
                        <img src={`${imgDir}/bike-pdp-suspension-full.png`} loading="lazy" width={80} height={80} style={{ display: "block" }} />
                        {value}
                        <figcaption data-sr-only>{value} Rear Suspension Travel</figcaption>
                    </figure>
                )
            }

            default: return <>{value}</>;
        }
    }

    const showLearnMoreButton = (point: PointObject) => {
        const categoryTree = productContext?.product?.categoryTree;
        if (!categoryTree) return;

        const productCategory = categoryTree[categoryTree.length - 1].name.toLowerCase();

        switch (productCategory) {
            case "mountain": {
                const hasText = point.info?.mountainText || point.info?.text;
                return !!hasText;
            }

            case "road": {
                const hasText = point.info?.roadText || point.info?.text;
                return !!hasText;
            }

            case "recreational": {
                const hasText = point.info?.recText || point.info?.text;
                return !!hasText;
            }

            case "recumbent/trike": {
                const hasText = point.info?.recText || point.info?.text;
                return !!hasText;
            }

            default: {
                const hasText = !!point.info?.text;
                return hasText;
            }
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
                            <td className={s.pointValue}>
                                <div className={s.valueContainer}>
                                    {PointIcon(point.label, point.value)}
                                </div>
                            </td>
                            <td className={s.pointMore}>
                                {showLearnMoreButton(point) &&
                                    <button onClick={() => handleMoreInfoClick(point)} className={s.learnMoreButton} aria-label={`Learn more about ${point.label}`}>
                                        Learn More <span className={s.questionMark}>?</span>
                                    </button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot></tfoot>
            </table>
            <dialog ref={modalRef} aria-label={`Learn more about ${learnMore?.title}.`} className={s.modalContainer} onClick={handleClickBackground}>
                <div className={s.modalContent}>
                    <div className={s.learnMoreTitle}>{learnMore?.title}</div>
                    <div dangerouslySetInnerHTML={{ __html: learnMore?.text || "" }} className={s.learnMoreTextContainer} />
                    <button aria-label="Close Dialog." onClick={handleCloseModal} className={s.modalCloseButton}>Close</button>
                </div>
            </dialog>
        </>
    );
};

export default DetailsBike;
