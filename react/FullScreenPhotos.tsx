// import React, { useEffect, useState, useRef } from "react";
// import { canUseDOM } from "vtex.render-runtime";
// import { useProduct } from 'vtex.product-context';

// import { default as s } from "./styles.css";

// type ProductItem = {
//     __typeName: string
//     complementName: string
//     ean: string
//     images: Array<ImageObject>
//     itemId: string
//     measurementUnit: string
//     name: string
//     nameComplete: string
//     variations: Array<{ name: string, __typename: string, values: Array<string> }>
// }

// type ImageObject = {
//     __typename: string
//     cacheId: string
//     imageId: string
//     imageLabel: string
//     imageTag: string
//     imageText: string
//     imageUrl: string
// }

// // You may replace either dimension with auto.
// const sourceString = (id: string, width: number = 500, height: number = 500) =>
//     `/arquivos/ids/${id}-${width}-${height}`

// const FullScreenPhotos = () => {
//     const productContext = useProduct();
//     const product = productContext?.product;

//     // State
//     const [fullScreen, setFullScreen] = useState(false);
//     const [fullScreenImageSrc, setFullScreenImageSrc] = useState("");
//     const [thumbnails, setThumbnails] = useState<Array<string>>([]);
//     const [photoIndex, setPhotoIndex] = useState(0);

//     // Ref
//     const fullScreenDiv = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (!canUseDOM) return;
//         document.addEventListener("fullscreenchange", handleScreenChange);
//         document.addEventListener("keydown", handleKeyDown);
//         return () => {
//             document.removeEventListener("fullscreenchange", handleScreenChange);
//             document.removeEventListener("keydown", handleKeyDown);
//         }
//     });

//     const handleScreenChange = () => {
//         if (!canUseDOM) return;
//         setFullScreen(!!document.fullscreenElement);
//     }

//     const handleKeyDown = (e: KeyboardEvent) => {
//         if (!fullScreen) return;

//         const left = e.key === "ArrowLeft";
//         const right = e.key === "ArrowRight";

//         const numberOfPhotos = thumbnails.length;

//         if (left)
//             setPhotoIndex(photoIndex === 0 ? numberOfPhotos - 1 : photoIndex - 1);

//         if (right)
//             setPhotoIndex(photoIndex === numberOfPhotos - 1 ? 0 : photoIndex + 1);
//     }
//     useEffect(() => {
//         buildImageSource();
//     }, [photoIndex]);

//     const buildImageSource = (imageId?: string) => {
//         if (!canUseDOM) return;
//         const windowWidth = window.innerWidth;
//         const windowHeight = window.innerHeight;
//         const longerDimension = windowWidth > windowHeight ? windowWidth : windowHeight;
//         const shorterDimension = windowWidth < windowHeight ? windowWidth : windowHeight;

//         setFullScreenImageSrc(sourceString(imageId || thumbnails[photoIndex], longerDimension - 200, longerDimension - 200));
//     }

//     const goFullScreen = async () => {
//         try {
//             await fullScreenDiv.current?.requestFullscreen();
//             if (document.fullscreenElement) {
//                 buildPhotoStream();

//                 setTimeout(() => {
//                     fullScreenDiv.current?.scroll({ top: window.innerHeight / 3, left: 0, behavior: "smooth" });
//                 }, 500);
//             }
//         } catch (e) {
//             console.error("Full Screen API is not available.");
//         }
//     }

//     const exitFullScreen = async () => {
//         try {
//             await document.exitFullscreen();
//             setFullScreenImageSrc("");
//             setPhotoIndex(0);
//         } catch (e) {
//             console.error("Full Screen API is not available.");
//         }
//     }

//     const buildPhotoStream = () => {
//         if (!product) return;

//         const items = product.items as ProductItem[];
//         const allImageIds: Array<string> = filterImages(items);

//         const images = product.items[0].images;
//         const firstImage = images[0].imageId;

//         setThumbnails(allImageIds);
//         buildImageSource(firstImage);
//     }

//     // Returns array of imageId strings. The desired strings are fairly
//     // deep within the productContext.
//     const filterImages = (items: ProductItem[]) => {
//         const duplicateColors = items.map((item, itemIndex) => {
//             const colorIndex = item.variations.findIndex(variation => variation.name === "Color");
//             const colorName = item.variations[colorIndex].values[0];
//             return { colorName, itemIndex }
//         });

//         const uniqueColorNames = Array.from(new Set(duplicateColors.map((item) => item.colorName)));
//         const uniqueColorsWithIndex = uniqueColorNames.map(color => duplicateColors.find(item => item.colorName === color));

//         return uniqueColorsWithIndex.map(item => {
//             return items[item?.itemIndex!].images.map(image => {
//                 return image.imageId;
//             });
//         }).flat();
//     }

//     return (
//         <div className={s.container}>
//             <button onClick={() => setFullScreen(!fullScreen)} className={s.goFullScreenButton}>
//                 <img src="/arquivos/gofullscreen.gif" alt="View Photos Full Screen" className={s.goFullScreenButtonImage} />
//                 <span className={s.fullScreenButtonLabel}>Full Screen</span>
//             </button>
//             <div ref={fullScreenDiv} tabIndex={-1} className={s.fullScreenDiv} style={{ display: fullScreen ? "block" : "none" }} >
//                 <button aria-label="Exit Full Screen Mode" onClick={() => setFullScreen(!fullScreen)} className={s.exitFullScreenButton}>
//                     X
//                 </button>
//                 <div className={s.mainImageContainer}>
//                     <img src={fullScreenImageSrc} alt="" className={s.largeImage} />
//                 </div>
//                 <div className={s.thumbnailContainer}>
//                     {thumbnails.length > 1 && <>
//                         {thumbnails?.map((thumbnail, index) => (
//                             <button aria-label={`Focus to image ${thumbnail}.`} key={thumbnail} data-image-id={thumbnail} data-image-index={index} data-active-photo={photoIndex === index} onClick={() => setPhotoIndex(index)} className={s.thumbnailButton}>
//                                 <img src={sourceString(thumbnail, 100, 100)} className={s.thumbnail} alt="" />
//                             </button>
//                         ))}</>}
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default FullScreenPhotos;
