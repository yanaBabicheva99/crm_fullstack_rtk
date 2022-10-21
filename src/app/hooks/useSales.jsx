import React, {useContext, useState, useEffect} from "react";
import {getSoldProducts} from "../utils/SellProducts";
import {getData} from "../utils/Products";

const SalesContext = React.createContext();


export const useSales = () => {
    return useContext(SalesContext);
}

export const SalesProvider = ({children}) => {
    const [soldProducts, setSoldProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const arrSoldProducts = getSoldProducts();
        setSoldProducts(arrSoldProducts);
        setLoading(false)
    }, []);

    const addSoldProduct = (data,  quantity, day) => {
        const {remains, ...soldData} = data;
        const soldProduct = soldProducts.find(product => product.id === soldData.id);

        if (soldProduct !== undefined) {
           return updateSoldProduct(soldProduct, quantity, day);
        }
        const updatedSoldProducts = [...soldProducts,
            {
                ...soldData,
                quantity,
                day,
                lastSale: getData()
            }
        ];
        localStorage.setItem('sellProducts', JSON.stringify(updatedSoldProducts));
        setSoldProducts(updatedSoldProducts);
    }

    const updateSoldProduct = (soldProduct, items, day) => {

        const updatedSoldProduct = {
            ...soldProduct,
            day,
            quantity: soldProduct.quantity + items
        };
        const updatedSoldProducts = soldProducts.map(product => {
            if (product.id === soldProduct.id) {
                return updatedSoldProduct;
            }
            return product;
        });

        localStorage.setItem('sellProducts', JSON.stringify(updatedSoldProducts));
        setSoldProducts(updatedSoldProducts);
    }

    const changeSoldProduct = (data) => {
        const soldProduct = soldProducts.find(product => product.id === data.id);

        if (soldProduct !== undefined) {
            const {remains, id, ...newData} = data;

            const updateSoldProduct = {
                ...soldProduct,
                ...newData
            };

            const updatedSoldProducts = soldProducts.map(product => {
                if (product.id === soldProduct.id) {
                    return updateSoldProduct;
                }
                return product;
            });

            localStorage.setItem('sellProducts', JSON.stringify(updatedSoldProducts));
            setSoldProducts(updatedSoldProducts);
        }
    }

    return <SalesContext.Provider value={
        {
            soldProducts,
            loading,
            addSoldProduct,
            changeSoldProduct
        }
    }>
        {children}
    </SalesContext.Provider>

}