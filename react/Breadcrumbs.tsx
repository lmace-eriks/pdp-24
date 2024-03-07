import React from "react";
import { useProduct } from 'vtex.product-context';
import { Link } from "vtex.render-runtime";

import { default as s } from "./styles.css";

const Breadcrumbs = () => {
    const productContext = useProduct();

    if (!productContext?.product?.categoryTree) return <nav className={s.breadcrumbsNav} />;

    return <nav aria-label="Breadcrumb" className={s.breadcrumbsNav}>
        <ol data-flex-vc className={s.breadcrumbsList}>
            {productContext?.product?.categoryTree.map((breadcrumb, index) => (
                <li key={breadcrumb.name} className={s.breadcrumbsListItem}>
                    {index !== 0 && <span aria-hidden="true" className={s.breadcrumbsSeparator}>|</span>}
                    <Link href={breadcrumb.href} className={s.breadcrumbsLink}>{breadcrumb.name}</Link>
                </li>
            ))}
        </ol>
    </nav>
}

export default Breadcrumbs;
