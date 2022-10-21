import React, {useContext, useEffect, useState} from 'react'
import {getData} from "../utils/Products";
import axios from "axios";

const ProductsContext = React.createContext();


export const useProducts = () => {
    return useContext(ProductsContext);
}

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const data = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
                setLoading(false);
            } catch(err) {
                console.log(err);
            }
        }
        getAllProducts()
    }, []);



    const deleteProduct = async (id) => {
        const product = products.find(product => product._id === id);
        const updateProduct = {
            ...product,
            delete: true
        };
        try {
          const data = await axios.patch('http://localhost:5000/api/products/remove/' + id, updateProduct);
            setProducts(products.map(product => {
                if (product._id === data._id) {
                    return data;
                }
                return product;
            }));
            
        } catch(err) {
            console.log(err);
        }

    }

    const getProducts = () => {
        return products.filter(product => product.remains !== 0 && !product.delete);
    }

    const getSoldProducts = () => {
        return products.filter(product => product.quantity !== '');
    }

    const addProduct = (data) => {
        const updatedProducts = [...products,  {
            id: Date.now(),
            ...data,
            // address: '15 Krylatskaya',
            creationData: getData(),
            day: '',
            lastSale: '',
            quantity: ''
        }];

        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
    }

    const changeProduct = (data) => {
        console.log('change', data);
        const oldProduct = products.find(product => product.id === data.id);

        const updatedProducts = products.map(product => {
            if (product.id === data.id) {
                return {
                    ...oldProduct,
                    ...data
                };
            }
            return product;
        });

        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
    }

    const updateProduct = (id, newQuantity, day) => {
        const product = products.find(product => product.id === id);
        const oldQuantity = Number(product.quantity);

        const updatedProduct = {
            ...product,
            remains: product.remains - newQuantity || 0,
            quantity: oldQuantity + newQuantity,
            day,
            lastSale: getData()
        };

         const updatedProducts = products.map(product => {
             if (product.id === id) {
                 return updatedProduct;
             }
             return product;
         });

        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
    }

    return <ProductsContext.Provider value={
        {
            products,
            loading,
            getProducts,
            getSoldProducts,
            addProduct,
            changeProduct,
            updateProduct,
            deleteProduct
        }
    }>
        {children}
    </ProductsContext.Provider>
}