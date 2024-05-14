import React from "react";
import { useListContext } from 'vtex.list-context'

import { default as s } from "./styles.css";

const ListContext = () => {
    const context = useListContext();
    const productListing = context.list;

    return (
        <div className={s.listContextProvider}>
            {productListing.map(item => {
                const Component = () => item;
                return (
                    <Component key={item.key} />
                )
            })}
        </div>
    );
}

export default ListContext;
