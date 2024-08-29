import React from "react";

const BlueBannerSource = (props: any) => {
    if (!props.bluePDPBanners) return <></>;

    // @ts-ignore bluePDPBanners does not exist on window.
    window.bluePDPBanners = props.bluePDPBanners;

    return (<script data-type="Source for ebs-blue-banner in PDP"></script>);
};

export default BlueBannerSource;

BlueBannerSource.schema = {
    title: "PDP Blue Banners",
    description: "",
    type: "object",
    properties: {
        bluePDPBanners: {
            title: "Banners",
            type: "array",
            items: {
                properties: {
                    __editorItemTitle: {
                        title: "Banner Name",
                        description: "Internal name",
                        type: "string"
                    },
                    bannerType: {
                        title: "Banner Type",
                        type: "string",
                        default: "none",
                        enumNames: ["None", "Collection", "Parent List"],
                        enum: ["none", "collection", "parentList"]
                    },
                    collection: {
                        title: "Collection Id Number",
                        description: "Single Collection Id Number",
                        type: "number",
                    },
                    parentList: {
                        title: "Parent List",
                        description: "Comma separated list of parent id numbers.",
                        type: "string",
                        widget: { "ui:widget": "textarea" },
                    },
                    bannerText: {
                        title: "Banner Title",
                        type: "string",
                        widget: { "ui:widget": "textarea" },
                    },
                    bannerSubtext: {
                        title: "Banner Title",
                        type: "string",
                        widget: { "ui:widget": "textarea" },
                    },
                    bannerLink: {
                        title: "URL",
                        description: "Optional",
                        type: "string",
                        widget: { "ui:widget": "textarea" },
                    }
                }
            }
        }
    }
};
