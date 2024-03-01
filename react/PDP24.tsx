import React, { ReactChildren, useRef, useState } from "react";
import { useProduct } from 'vtex.product-context';

import { default as s } from "./styles.css";

// Components
import StarterKit from "./StarterKit";
import EriksExtras from "./EriksExtras";
import BikeFinder from "./BikeFinder";
import ProductDetails from "./ProductDetails";

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
  bikeBestUse: "ProductData_BikeBestUse"
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

export const waitForDOM = (callbackFunction: any, ms: number = 1) => setTimeout(() => callbackFunction(), ms);

const PDP24 = ({ children }: PDP24Props) => {
  // Hooks
  const productContext = useProduct();
  const productProperties = productContext?.product?.properties;
  const productCategories = productContext?.product?.categories[0];

  // Refs
  const sections = useRef<Array<HTMLDivElement>>([]);
  const setSectionRef = (element: HTMLDivElement, wrapper: number) => sections.current[wrapper] = element;

  // State
  // Negative two for initial load to avoid using a useEffect(). - LM
  const [activeSection, setActiveSection] = useState(-2);

  const activateSection = (index: number, scrollTo: boolean = false) => {
    if (activeSection === index) {
      setActiveSection(-1);
      if (window) window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setActiveSection(index);
      if (scrollTo) scrollToActiveSection(index);
    }
  }

  const scrollToActiveSection = (index: number) => {
    waitForDOM(() => {
      const newlyActivatedSection = sections.current[index];
      if (window) window.scrollTo({ top: newlyActivatedSection.offsetTop - 50, left: 0, behavior: "smooth" });
    });
  }

  const getTitle = (section: string) => {

    switch (section) {
      case sectionInfo.starterKit.label:
        const bikeBestUse = productProperties?.find(item => item.name === stringTriggers.bikeBestUse)?.values[0];
        return `${bikeBestUse || ""} Bicycle ${section}`;

      default:
        return section;
    }
  }

  const isCategory = (category: string) => productCategories?.includes(category);

  const getApplicability = (section: string) => {

    switch (section) {
      // Starter Kit
      case sectionInfo.starterKit.label: {
        const isBike = isCategory(stringTriggers.bicycles);
        if (!isBike) return false;

        const bikeHasBestUse = !!productProperties?.find(item => item.name === stringTriggers.bikeBestUse)?.values[0];
        return bikeHasBestUse;
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
        const isGiftCard = isCategory(stringTriggers.giftCards);
        return !isGiftCard;
      }

      case sectionInfo.geometry.label: {
        // Geometry
        const isBike = isCategory(stringTriggers.bicycles);
        return isBike;
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

  // Runs on first load to see which section should activate.
  // This prevents us from needing a useEffect().
  const getInitialActivity = (section: string) => {
    const hasDetails = productContext?.product?.properties.some(item => item.name.includes(stringTriggers.productData));

    if (section === sectionInfo.details.label) {
      return hasDetails;
    } else {
      if (section === sectionInfo.technicalSpecifications.label && !hasDetails) {
        return true;
      }
    }

    return false;
  }

  const ReviewsApp = () => children.find((child: any) => child.props.id === "product-reviews.power-reviews");
  const SimmilarProducts = () => children.find((child: any) => child.props.id === "shelf.relatedProducts");
  const ProductDescription = () => <div dangerouslySetInnerHTML={{ __html: productContext?.product?.description || "" }} />

  return (
    <div className={s.container}>
      {Object.values(sectionInfo).map((section: SectionInfo, index: number) => (
        <section
          key={`section-${index}`}
          id={`section-${index}`}
          ref={(element: HTMLDivElement) => setSectionRef(element, index)}
          data-section={index}
          data-active-section={activeSection === -2 ? getInitialActivity(section.label) : activeSection === index ? "true" : "false"}
          data-applicable={getApplicability(section.label)}
          aria-labelledby={`section-${index}-title`}
          className={s.section}>
          <button onClick={() => activateSection(index, true)} className={s.sectionButton}>
            <h2 id={`section-${index}-title`} className={s.sectionTitle}>{getTitle(section.label)}</h2>
            <img src="/arquivos/sm-caret.gif" width="24" height="14" className={s.caret} aria-hidden="true" alt="" />
          </button>
          <div className={s.window}>
            {section.label === sectionInfo.details.label && <ProductDetails />}
            {section.label === sectionInfo.starterKit.label && activeSection === index && <StarterKit children={children} />}
            {section.label === sectionInfo.technicalSpecifications.label && <ProductDescription />}
            {section.label === sectionInfo.geometry.label && <>Geometry Section</>}
            {section.label === sectionInfo.eriksExtras.label && activeSection === index && <EriksExtras />}
            {section.label === sectionInfo.reviews.label && activeSection === index && <ReviewsApp />}
            {section.label === sectionInfo.bikeFinder.label && activeSection === index && <BikeFinder />}
            {section.label === sectionInfo.similarProducts.label && activeSection === index && <SimmilarProducts />}
          </div>
        </section>
      ))}
    </div>
  )
}

export default PDP24
