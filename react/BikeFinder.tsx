import React from "react";

import { default as s } from "./styles.css";
import { Link } from "vtex.render-runtime";

const BikeFinder = () => {

    return (
        <div className={s.bikeFinderContainer}>
            <Link to="/bike-finder" aria-label="Find your perfect bike with our bike finder tool." className={s.finderLink}>
                <img src="/arquivos/bike-finder-bucket-24.gif" alt="" width={450} height={450} loading="lazy" className={s.bikeFinderImage} />
            </Link>
            <Link to="/bike-finder-car-racks" aria-label="Find your perfect car rack with our car rack finder tool." className={s.finderLink}>
                <img src="/arquivos/bike-rack-finder-bucket-24.gif" alt="" width={450} height={450} loading="lazy" className={s.bikeFinderImage} />
            </Link>
        </div>
    );
};

export default BikeFinder;