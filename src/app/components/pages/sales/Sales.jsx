import React from 'react';
import SalesTable from "../../table/salesTable/SalesTable";
import style from "../../../style/title/Title.module.scss";
import {useProducts} from "../../../hooks/useProducts";
import {useEffect, useState} from "react";

const Sales = () => {
    const {products, getSoldProducts, loading} = useProducts();

    const [soldProducts, setSoldProducts] = useState([]);

    useEffect(() => {
        if (!loading) {
            setSoldProducts(getSoldProducts());
        }
    }, [loading, products]);
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
    );
};

export default Sales;