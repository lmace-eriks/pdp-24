import React, { useRef } from "react";
import { useProduct } from "vtex.product-context";

import { default as s } from "../styles.css";

const sizeCharts: { modelList: string[], html: string }[] = [
    {
        modelList: ["Ambush 2", "Chamonix 3", "Evade 3", "Gambit", "Loma", "Mode", "Prevail 3", "Propero 4", "Search", "Tactic 4", "Tone", "TT5"],
        html: "<table> <thead> <th>Size</th> <th>Inches</th> <th>Centimeters</th> </thead> <tbody> <tr> <td>Small</td> <td>20 - 22</td> <td>51 - 56</td> </tr> <tr> <td>Medium</td> <td>21 <sup>3/4</sup> - 23 <sup>1/4</sup></td> <td>55 - 59</td> </tr> <tr> <td>Large</td> <td>22 <sup>3/4</sup> - 24 <sup>1/2</sup></td> <td>58 - 62</td> </tr> </tbody> <tfoot></tfoot> </table>"
    },
    {
        modelList: ["Airnet", "Echelon II", "Propero 3"],
        html: "<table> <thead> <th>Size</th> <th>Inches</th> <th>Centimeters</th> </thead> <tbody> <tr> <td>Small</td> <td>20 - 22</td> <td>51 - 56</td> </tr> <tr> <td>Medium</td> <td>21 <sup>3/4</sup> - 23 <sup>1/4</sup></td> <td>55 - 59</td> </tr> <tr> <td>Large</td> <td>23 <sup>1/4</sup> - 24 <sup>3/4</sup></td> <td>59 - 63</td> </tr> </tbody> <tfoot></tfoot> </table>"
    },
    {
        // "Shuffle LED" and "Shuffle Child" may not exist, but we have two in our catalog (pr3e25993 and pr5a10317).
        // Unsure if it's a LED version of the Shuffle or if they're Shuffle 2 LEDs with incorrect names - LM
        modelList: ["Shuffle LED", "Shuffle Child"],
        html: "<table> <thead> <th>Size</th> <th>Inches</th> <th>Centimeters</th> </thead> <tbody> <tr> <td>Child</td> <td>19 <sup>1/4</sup> - 21 <sup>3/4</sup></td> <td>49 - 55</td> </tr> <tr> <td>Youth</td> <td>20 <sup>1/2</sup> - 22 <sup>1/2</sup></td> <td>52 - 57</td> </tr> </tbody> <tfoot></tfoot> </table>"
    },
    {
        modelList: ["Camber"],
        html: "<table> <thead> <th>Size</th> <th>Inches</th> <th>Centimeters</th> </thead> <tbody> <tr> <td>Extra Small</td> <td>19 <sup>1/4</sup> - 20 <sup>3/4</sup></td> <td>49 - 53</td> </tr> <tr> <td>Small</td> <td>20 - 22</td> <td>51 - 56</td> </tr> <tr> <td>Medium</td> <td>21 <sup>3/4</sup> - 23 <sup>1/4</sup></td> <td>55 - 59</td> </tr> <tr> <td>Large</td> <td>22 <sup>3/4</sup> - 24 <sup>1/2</sup></td> <td>58 - 62</td> </tr> <tr> <td>Extra Large</td> <td>23 <sup>1/2</sup> - 24 <sup>3/4</sup></td> <td>60 - 63</td> </tr> </tbody> <tfoot></tfoot> </table>"
    },
    {
        modelList: ["Chamonix II"],
        html: "<table> <thead> <th>Size</th> <th>Inches</th> <th>Centimeters</th> </thead> <tbody> <tr> <td>S/M</td> <td>20 <sup>1/2</sup> - 22</td> <td>52 - 56</td> </tr> <tr> <td>M/L</td> <td>22 - 23 <sup>1/2</sup></td> <td>56 - 60</td> </tr> </tbody> <tfoot></tfoot> </table>"
    },
    {
        modelList: ["Align II"],
        html: "<table> <thead> <th>Size</th> <th>Inches</th> <th>Centimeters</th> </thead> <tbody> <tr> <td>S/M</td> <td>20 <sup>1/2</sup> - 22</td> <td>52 - 56</td> </tr> <tr> <td>M/L</td> <td>22 - 23 <sup>1/2</sup></td> <td>56 - 60</td> </tr> <tr> <td>XL</td> <td>23 <sup>1/4</sup> - 24 <sup>1/2</sup></td> <td>59 - 62</td> </tr> </tbody> <tfoot></tfoot> </table>"
    },
    {
        modelList: ["Dissident 2"],
        html: "<table> <thead> <th>Size</th> <th>Inches</th> <th>Centimeters</th> </thead> <tbody> <tr> <td>Small</td> <td>21 <sup>3/4</sup> - 22<sup>1/2</sup></td> <td>55 - 57</td> </tr> <tr> <td>Medium</td> <td>22 <sup>1/2</sup> - 23 <sup>1/4</sup></td> <td>57 - 59</td> </tr> <tr> <td>Large</td> <td>22 <sup>3/4</sup> - 23 <sup>1/2</sup></td> <td>58 - 60</td> </tr> <tr> <td>Extra Large</td> <td>23 <sup>1/2</sup> - 24 <sup>1/2</sup></td> <td>60 - 62</td> </tr> </tbody> <tfoot></tfoot> </table>"
    },
    {
        modelList: ["Mio 2"],
        html: "<table> <thead> <th>Size</th> <th>Inches</th> <th>Centimeters</th> </thead> <tbody> <tr> <td>Extra Small</td> <td>18 - 20</td> <td>46 - 51</td> </tr> </tbody> <tfoot></tfoot> </table>"
    }
]

const SpecializedHelmets = () => {
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
                            <h3 style={{ marginBottom: "0" }}>Size Chart for Specialized Helmet models</h3>
                            <div style={{ textAlign: "center", maxWidth: "65%", margin: "0 auto 0.5rem auto" }}>{displayModelList}</div>
                        </>}
                    <div className={s.sizeChartTableContainer} dangerouslySetInnerHTML={{ __html: sizeChartHTML }} />
                </div>
            </dialog>
        </>
    );
};

export default SpecializedHelmets;
