import React, { ReactChildren, useRef, useState } from "react";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

// Components
import StarterKit from "./StarterKit";
import EriksExtras from "./EriksExtras";
import BikeFinder from "./BikeFinder";
import ProductDetails from "./ProductDetails";

// import { parentIdStarterKits } from "./starterKitParentIdList";
// import { binarySearchParentId, sortedAventonBikeParentIdList } from "./typesData";

type PDP24Props = {
  children: ReactChildren | any
}

type SectionInfoObject = {
  starterKit: SectionInfo
  details: SectionInfo,
  eriksExtras: SectionInfo,
  reviews: SectionInfo,
  technicalSpecifications: SectionInfo,
  geometry: SectionInfo,
  bikeFinder: SectionInfo,
  similarProducts: SectionInfo
}

type SectionInfo = {
  label: string
}

export const stringTriggers = {
  cycling: "/Cycling/",
  bicycles: "/Bicycles/",
  snowboards: "/Snowboards/",
  skis: "/Skis/",
  giftCards: "/Gift Cards/",
  productData: "ProductData_",
  bikeBestUse: "ProductData_BikeBestUse",
  sizeChart: "Size Chart",
  eriksExtras: "Extra"
}

// "Related Articles" is a separate VTEX native app. It will render if there is at least 1 blog post. - LM
const sectionInfo: SectionInfoObject = {
  starterKit: {
    label: "Starter Kit"
  },
  details: {
    label: "Details"
  },
  eriksExtras: {
    label: "ERIK'S Extras"
  },
  technicalSpecifications: {
    label: "Technical Specifications"
  },
  geometry: {
    label: "Geometry"
  },
  bikeFinder: {
    label: "Bike Finder"
  },
  reviews: {
    label: "Reviews"
  },
  similarProducts: {
    label: "Similar Products"
  }
}

const PDP24 = ({ children }: PDP24Props) => {
  // Hooks
  const productContext = useProduct();
  const productProperties = productContext?.product?.properties;
  const productCategories = productContext?.product?.categories[0];

  // Refs
  const sections = useRef<Array<HTMLDivElement>>([]);
  const setSectionRef = (element: HTMLDivElement, wrapper: number) => sections.current[wrapper] = element;

  // State
  // Negative two for initial load to avoid using a useEffect(). Use negative one for collapse all. - LM
  const [activeSection, setActiveSection] = useState(-2);

  const isCategory = (category: string) => productCategories?.includes(category);

  if (!children[0]) {
    console.error("App requires specific child apps. See PDP24.tsx for details.");
    return <></>;
  }

  const activateSection = (index: number, scrollTo: boolean = false) => {
    if (activeSection === index) {
      // Negative two for initial load, negative one for collapse all.
      setActiveSection(-1);
      if (window) window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setActiveSection(index);
      if (scrollTo) {
        /*
          The rAF() callback will run before next paint, but after the current
          function in the browser's call stack executes. Here we are wating for react
          to setActiveSection(index) state before determining where the newlyActivatedSection
          element is in the window. Because all sections' height (open or closed) are determined
          by activeSection state, we need to collapse all accordion sections before determining
          where to scroll to.
        */
        requestAnimationFrame(() => {
          const newlyActivatedSection = sections.current[index];
          if (window) window.scrollTo({ top: newlyActivatedSection.offsetTop - 50, left: 0, behavior: "smooth" });
        })
      }
    }
  }

  const getTitle = (section: string) => {

    switch (section) {
      case sectionInfo.starterKit.label:
        const bikeBestUse = productProperties?.find(item => item.name === stringTriggers.bikeBestUse)?.values[0];
        return `${bikeBestUse || ""} Bicycle ${section}`;

      case sectionInfo.details.label:
        const isBike = isCategory(stringTriggers.bicycles);
        const isSnowboard = isCategory(stringTriggers.snowboards);
        const isSki = isCategory(stringTriggers.skis);
        return `${isBike ? "Bike " : isSnowboard ? "Snowboard " : isSki ? "Ski " : ""}Details`;

      default:
        return section;
    }
  }

  const getApplicability = (section: string) => {

    switch (section) {
      // Starter Kit
      case sectionInfo.starterKit.label: {
        // Section not ready to publish yet. More RMS dev work needed. 05/13/2024 - LM
        // Update. Marketing wants Aventon ebikes to display custom starter kit. - 05/28/2024 - LM
        // Update. Marketing wants this outside of accordion. - 05/31/2024 - LM

        return false;

        // const parentId = productContext?.product?.productReference;
        // if (!parentId) return false;

        // const showAventonStarterKit = binarySearchParentId(parentId, sortedAventonBikeParentIdList, 0, sortedAventonBikeParentIdList.length - 1);
        // return showAventonStarterKit;
      }

      case sectionInfo.details.label: {
        // Details
        const hasDetails = productProperties?.some(item => item.name.includes(stringTriggers.productData));
        return hasDetails;
      }

      case sectionInfo.bikeFinder.label: {
        // Bike Finder
        const isCycling = isCategory(stringTriggers.cycling);
        return isCycling;
      }

      case sectionInfo.eriksExtras.label: {
        // Erik's Extras
        const hasExtras = !!productProperties?.find(item => item.name === stringTriggers.eriksExtras);
        return hasExtras;
      }

      case sectionInfo.geometry.label: {
        // Geometry - Where are we with this section? - LM 04/2024
        return false;
      }

      case sectionInfo.similarProducts.label: {
        // Similar Products
        const isGiftCard = isCategory(stringTriggers.giftCards);
        return !isGiftCard;
      }

      default:
        return true;
    }
  }

  // Runs if activeSection = -2 to see which section should activate.
  // This prevents us from needing a useEffect().
  const getInitialActivity = (section: string) => {
    const hasDetails = productContext?.product?.properties.some(item => item.name.includes(stringTriggers.productData));

    switch (section) {
      // Details
      case sectionInfo.details.label: {
        if (hasDetails) {
          setActiveSection(1);
        }

        return hasDetails;
      }

      // Technical Specifications
      case sectionInfo.technicalSpecifications.label: {
        if (!hasDetails) {
          setActiveSection(3);
        }

        return hasDetails ? false : true;
      }

      default: return false;
    }
  }

  const ReviewsApp = () => children.find((child: any) => child.props.id === "product-reviews.power-reviews");
  const SimmilarProducts = () => children.find((child: any) => child.props.id === "shelf.relatedProducts");
  const TechnicalSpecifications = () => <div dangerouslySetInnerHTML={{ __html: productContext?.product?.description || "" }} className={s.technicalSpecs} />

  return (
    <div className={s.accordionContainer}>
      {Object.values(sectionInfo).map((section: SectionInfo, index: number) => (
        <section
          key={`section-${index}`}
          id={section.label === sectionInfo.reviews.label ? "all-reviews" : `section-${index}`}
          ref={(element: HTMLDivElement) => setSectionRef(element, index)}
          data-section={index}
          data-active-section={activeSection === -2 ? getInitialActivity(section.label) : activeSection === index ? "true" : "false"}
          data-applicable={getApplicability(section.label)}
          aria-labelledby={`section-${index}-title`}
          className={s.section}>
          <button aria-controls={`window-${index}`} onClick={() => activateSection(index, true)} className={s.sectionButton}>
            <h2 id={`section-${index}-title`} className={s.sectionTitle}>{getTitle(section.label)}</h2>
            <img src="/arquivos/sm-caret.gif" width="24" height="14" className={s.caret} aria-hidden="true" alt="" />
          </button>
          <div id={`window-${index}`} aria-hidden={!(activeSection === index)} className={s.window}>
            {section.label === sectionInfo.starterKit.label && activeSection === index && <StarterKit children={children} />}
            {section.label === sectionInfo.details.label && <ProductDetails />}
            {section.label === sectionInfo.eriksExtras.label && activeSection === index && <EriksExtras />}
            {section.label === sectionInfo.technicalSpecifications.label && <TechnicalSpecifications />}
            {section.label === sectionInfo.geometry.label && <>Geometry Section</>}
            {section.label === sectionInfo.bikeFinder.label && activeSection === index && <BikeFinder />}
            {section.label === sectionInfo.reviews.label && activeSection === index && <ReviewsApp />}
            {section.label === sectionInfo.similarProducts.label && activeSection === index && <SimmilarProducts />}
          </div>
        </section>
      ))}
    </div>
  )
}

export default PDP24
