import React, { ReactChildren, useRef, useState } from "react";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

// Components
import EriksExtras from "./EriksExtras";
import BikeFinder from "./BikeFinder";
import ProductDetails from "./ProductDetails";

type PDP24Props = {
  children: ReactChildren | any
}

type SectionInfoObject = {
  details: SectionInfo,
  eriksExtras: SectionInfo,
  reviews: SectionInfo,
  technicalSpecifications: SectionInfo,
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

const sectionInfo: SectionInfoObject = {
  details: {
    label: "Details"
  },
  eriksExtras: {
    label: "ERIK'S Extras"
  },
  technicalSpecifications: {
    label: "Technical Specifications"
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
          The rAF() schedules its callback to run after the current browser paint and callstack function,
          but before the next paint. Here we are waiting for react to setActiveSection(index) state before
          determining where the newlyActivatedSection element is in the window. Because all sections'
          height (open or closed) are determined by activeSection state, we need to collapse all non-active
          accordion sections before determining where to scroll to. - LM
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
      case sectionInfo.details.label:
        const isBike = isCategory(stringTriggers.bicycles);
        const isSnowboard = isCategory(stringTriggers.snowboards);
        const isSki = isCategory(stringTriggers.skis);
        return `${isBike ? "Bike " : isSnowboard ? "Snowboard " : isSki ? "Ski " : ""}Details`;

      default:
        return section;
    }
  }

  // Returns boolean. Determines if section should be visible with CSS.
  const getApplicability = (section: string) => {

    switch (section) {

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
    const sectionLabels = Array.from(sectionElements.keys());

    switch (section) {
      // Details
      case sectionInfo.details.label: {
        if (hasDetails) {
          const detailsSectionIndex = sectionLabels.findIndex(section => section === sectionInfo.details.label);
          setActiveSection(detailsSectionIndex);
        }

        return hasDetails;
      }

      // Technical Specifications
      case sectionInfo.technicalSpecifications.label: {
        if (!hasDetails) {
          const techSpecsSectionIndex = sectionLabels.findIndex(section => section === sectionInfo.technicalSpecifications.label);
          setActiveSection(techSpecsSectionIndex);
        }

        return hasDetails ? false : true;
      }

      default: return false;
    }
  }

  const sectionAttributes: (label: string, index: number) => { [key: string]: any } = (label: string, index: number) => {
    return {
      key: `section-${index}`,
      id: label === sectionInfo.reviews.label ? "all-reviews" : `section-${index}`,
      ref: (element: HTMLDivElement) => setSectionRef(element, index),
      "data-section": index,
      "data-active-section": activeSection === -2 ? getInitialActivity(label) : activeSection === index ? "true" : "false",
      "aria-labelledby": `section-${index}-title`,
      className: s.section
    }
  }

  const ReviewsApp = () => children.find((child: any) => child.props.id === "product-reviews.power-reviews");
  const SimmilarProducts = () => children.find((child: any) => child.props.id === "shelf.relatedProducts");
  const TechnicalSpecifications = () => <div dangerouslySetInnerHTML={{ __html: productContext?.product?.description || "" }} className={s.technicalSpecs} />

  const sectionElements = new Map<string, JSX.Element>();
  sectionElements.set(sectionInfo.details.label, <ProductDetails />);
  sectionElements.set(sectionInfo.eriksExtras.label, <EriksExtras />);
  sectionElements.set(sectionInfo.technicalSpecifications.label, <TechnicalSpecifications />);
  sectionElements.set(sectionInfo.bikeFinder.label, <BikeFinder />);
  sectionElements.set(sectionInfo.reviews.label, <ReviewsApp />);
  sectionElements.set(sectionInfo.similarProducts.label, <SimmilarProducts />);

  const lazyLoadSectionLabels = new Set([sectionInfo.eriksExtras.label, sectionInfo.bikeFinder.label, sectionInfo.reviews.label, sectionInfo.similarProducts.label]);

  return (
    <div className={s.accordionContainer}>
      {Object.values(sectionInfo).map((section: SectionInfo, index: number) => {
        const { label } = section;
        if (!getApplicability(label)) return <></>;

        const isLazyLoaded = lazyLoadSectionLabels.has(label);
        const currentlyActiveSection = activeSection === index;
        const activeAndLazy = isLazyLoaded && currentlyActiveSection;

        return (
          <section {...sectionAttributes(label, index)}>
            <button aria-controls={`window-${index}`} onClick={() => activateSection(index, true)} className={s.sectionButton}>
              <h2 id={`section-${index}-title`} className={s.sectionTitle}>{getTitle(label)}</h2>
              <img src="/arquivos/sm-caret.gif" width="24" height="14" className={s.caret} aria-hidden="true" alt="" />
            </button>
            <div id={`window-${index}`} aria-hidden={!(activeSection === index)} className={s.window}>
              {activeAndLazy && sectionElements.get(label)}
              {!isLazyLoaded && sectionElements.get(label)}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default PDP24
