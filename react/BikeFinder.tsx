import React from "react";

import { default as s } from "./styles.css";
import { Link } from "vtex.render-runtime";

const BikeFinder = () => {

    return (
        <div className={s.bikeFinderContainer}>
            <Link href="/bike-finder" aria-label="Find your perfect bike with our bike finder tool." className={s.finderLink}>
                <img src="/assets/vtex.file-manager-graphql/images/9720e006-59ea-4116-b8d4-fa5966635037___5ccb826d3cc457a2f58a138efe942810.gif" alt="" width={500} height={500} loading="lazy" />
            </Link>
            <Link href="/bike-finder-car-racks" aria-label="Find your perfect car rack with our car rack finder tool." className={s.finderLink}>
                <img src="/assets/vtex.file-manager-graphql/images/9720e006-59ea-4116-b8d4-fa5966635037___5ccb826d3cc457a2f58a138efe942810.gif" alt="" width={500} height={500} loading="lazy" />
            </Link>
        </div>
    );
};

export default BikeFinder;