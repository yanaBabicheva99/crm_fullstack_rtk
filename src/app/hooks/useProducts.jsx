import React, {useContext, useEffect, useState} from 'react'
import {getData} from "../utils/Products";
import axios from "axios";
import useAuth from "./useAuth";
import {ProductService} from "../services/product.service";

const ProductsContext = React.createContext();


export const useProducts = () => {
    return useContext(ProductsContext);
}

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {token} = useAuth();

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const data = await ProductService.get();
                setProducts(data);
                setLoading(false);

            } catch (err) {
                console.log(err);
            }
        }
        getAllProducts();
    }, []);


    const deleteProduct = async (id) => {
        const product = products.find(product => product._id === id);
        const updateProduct = {
            ...product,
            delete: true
        };

        try {
            const data = await ProductService.delete(id, updateProduct);

            setProducts(prevState => prevState.map(product => {
                if (product._id === data._id) {
                    return data;
                }
                return product
            }));

            return data;
        } catch (err) {
            console.log(err);
        }

    }

    const getProducts = () => {
        return products.length ? products.filter(product => product.remains !== 0 && !product.delete) : [];
    }

    const getSoldProducts = () => {
        return  products.length ? products.filter(product => product.quantity): [];
    }

    const addProduct = async (content) => {
        const product = {
            ...content,
            creationData: getData(),
        }

        try {
            const data = await ProductService.create(product);
            setProducts(prevState => [...prevState, data]);
            return data;

        } catch(err) {
            console.log(err);
        }
    }

    const changeProduct = async (content) => {
        console.log('change', content);
        const oldProduct = products.find(product => product._id === content._id);

        const changedProduct = {
            ...oldProduct,
            ...content
        };

        try {
            const data = await ProductService.change(content._id, changedProduct);
            setProducts(prevState => prevState.map(product => {
                if (product._id === data._id) {
                    return data;
                }
                return product;
            }));
            return data;
        } catch(err) {
            console.log(err);
        }

    }

    const updateProduct = async (id, newQuantity, day) => {
        const product = products.find(product => product._id === id);
        const oldQuantity = Number(product.quantity);

        const updatedProduct = {
            ...product,
            remains: product.remains - newQuantity || 0,
            quantity: oldQuantity + newQuantity,
            day,
            lastSale: getData()
        };

        try {
            const data = await ProductService.update(id, updatedProduct);
            setProducts(prevState => prevState.map(product => {
                if (product._id === data._id) {
                    return data;
                }
                return product;
            }));
            return data;
        } catch(err) {
            console.log(err);
        }

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