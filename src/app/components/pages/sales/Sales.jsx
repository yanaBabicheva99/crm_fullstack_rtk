import React from 'react';
import SalesTable from "../../table/salesTable/SalesTable";
import style from "../../../style/title/Title.module.scss";
import {useProducts} from "../../../hooks/useProducts";

const Sales = () => {
    const {products, loading} = useProducts();

    const soldProducts = products.length ? products.filter(product => product.quantity): [];

    if (loading) {
        return <h2>Loading...</h2>
    } else {
        return (
            <>
                {soldProducts.length === 0
                    ? <div className={style.title__wrapper}>
                        <h2 className={style.title}>Sales not found</h2>
                    </div>
                    : <SalesTable
                        sellProducts={soldProducts}
                    />
                }
            </>
        )
    }
};

export default Sales;