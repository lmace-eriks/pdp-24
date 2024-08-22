import React, { useRef } from "react";
import { useProduct } from "vtex.product-context";

import { default as s } from "../styles.css";

const sizeCharts: { modelList: string[], html: string }[] = [
    {
        modelList: ["Syntax"],
        html: "<table> <thead> <th>Size</th> <th>Centimeters</th> </thead> <tbody> <tr> <td>Small</td> <td>51 - 55</td> </tr> <tr> <td>Medium</td> <td>55 - 59</td> </tr> <tr> <td>Large</td> <td>59 - 63</td> </tr> <tr> <td>Extra Large</td> <td>61 - 65</td> </tr> </tbody> <tfoot></tfoot> </table>"
    },
    {
        modelList: ["Aries Spherical"],
        html: "<table> <thead> <th>Size</th> <th>Centimeters</th> </thead> <tbody> <tr> <td>Small</td> <td>51 - 55</td> </tr> <tr> <td>Medium</td> <td>55 - 59</td> </tr> <tr> <td>Large</td> <td>59 - 63</td> </tr> </tbody> <tfoot></tfoot> </table>"
    },
    {
        modelList: ["Scamp"],
        html: "<table> <thead> <th>Size</th> <th>Centimeters</th> </thead> <tbody> <tr> <td>Extra Small</td> <td>45 - 49</td> </tr> <tr> <td>Small</td> <td>49 - 53</td> </tr> </tbody> <tfoot></tfoot> </table>"
    },
    {
        modelList: ["Fixture"],
        html: "<table> <thead> <th>Size</th> <th>Centimeters</th> </thead> <tbody> <tr> <td>Universal Youth</td> <td>50 - 57</td> </tr> <tr> <td>Universal Adult</td> <td>54 - 61</td> </tr> <tr> <td>Universal Extra Large</td> <td>58 - 65</td> </tr> </tbody> <tfoot></tfoot> </table>"
    },
    {
        modelList: ["Agilis MIPS Helmet"],
        html: "<table> <thead> <th>Size</th> <th>Centimeters</th> </thead> <tbody> <tr> <td>Small</td> <td>51 - 55</td> </tr> <tr> <td> Medium</td> <td>55 - 59</td> </tr> <tr> <td>Large</td> <td>59 - 63</td> </tr> </tbody> <tfoot></tfoot> </table>"
    },
    {
        modelList: ["Agilis MIPS Women"],
        html: "<table> <thead> <th>Size</th> <th>Centimeters</th> </thead> <tbody> <tr> <td>Small</td> <td>51 - 55</td> </tr> <tr> <td> Medium</td> <td>55 - 59</td> </tr> </tbody> <tfoot></tfoot> </table>"
    }
]

const GiroHelmets = () => {
    const productContext = useProduct();
    const productTitle = productContext?.product?.productName;
    if (!productTitle) return <></>;

    let sizeChartHTML = "";
    let sizeChartModelList: string[] = [];

    let breakOutterLoop = false;

    for (const { modelList, html } of sizeCharts) {
        if (breakOutterLoop) break;

        for (const model of modelList) {
            if (productTitle.includes(model)) {
                sizeChartHTML = html;
                sizeChartModelList = modelList;

                breakOutterLoop = true;
                break;
            }
        }
    }

    if (!sizeChartHTML) return <></>;

    const displayModelList = sizeChartModelList.map((model, index) => {
        if (sizeChartModelList.length === 1) {
            return model;
        }

        switch (index) {
            case sizeChartModelList.length - 1: {
                return ` and ${model}.`;
            }

            case sizeChartModelList.length - 2: {
                return `${model} `;
            }

            default: {
                return `${model}, `
            }
        }
    }).join("");

    const modalRef = useRef<HTMLDialogElement>(null);

    const handleSizeToolClick = () => {
        modalRef.current?.showModal();
    }

    const handleClickBackground = (e: any) => {
        const clickX = e.clientX;
        const clickY = e.clientY;
        const modalBounds = modalRef.current?.getBoundingClientRect();
        if (!modalRef.current || !modalBounds) return;

        const backgroundBounds =
            clickX < modalBounds.left ||
            clickX > modalBounds.right ||
            clickY < modalBounds.top ||
            clickY > modalBounds.bottom;

        if (backgroundBounds) modalRef.current.close();
    }

    const handleCloseModal = () => {
        modalRef.current?.close();
    }

    return (
        <>
            <button onClick={handleSizeToolClick} className={s.sizeToolButton}>
                Size Chart
            </button>

            <dialog ref={modalRef} aria-label="Size Chart" className={s.modalContainer} onClick={handleClickBackground} >
                <div className={s.sizeChartContainer}>
                    <button aria-label="Close Dialog." onClick={handleCloseModal} className={s.modalCloseButton}>Close Size Chart</button>
                    <div>
                        <div style={{ textAlign: "center", padding: "0.5rem 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div><div className="b">How to measure</div>Measure horizontally around the temple.</div>
                        </div>
                    </div>
                    {sizeChartModelList.length > 1 &&
                        <>
                            <h3 style={{ marginBottom: "0" }}>Size Chart for Giro Helmets Helmet models</h3>
                            <div style={{ textAlign: "center", maxWidth: "65%", margin: "0 auto 0.5rem auto" }}>{displayModelList}</div>
                        </>}
                    <div className={s.sizeChartTableContainer} dangerouslySetInnerHTML={{ __html: sizeChartHTML }} />
                </div>
            </dialog>
        </>
    );
};

export default GiroHelmets;
