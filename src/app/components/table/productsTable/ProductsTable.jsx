import React from 'react';
import {getPrice, getWeight} from "../../../utils/Products";
import Actions from "../../actions/Actions";
import TableHeader from "../tableHeader/TableHeader";
import TableBody from "../tableBody/TableBody";
import {useUser} from "../../../hooks/useUser";
import {Link} from "react-router-dom";
import styleBox from '../Table.module.scss';

const ProductsTable = ({products, handleDelete, onCurrentProduct, onVisibleEdit}) => {
    const {user, loading} = useUser();

    if (loading) {
        return <h2>Loading...</h2>
    }


    const columns = {
        productName: {
            path: 'productName',
            name: 'Product name',
        },
        store: {
            path: 'store',
            name: 'Store'
        },
        address: {
            path: 'address',
            name: 'Address',
            component: () => user.address.trim() || <Link to='/personal'>address</Link>
        },
        category: {
            path: 'category',
            name: 'Category'
        },
        creationData: {
            path: 'creationData',
            name: 'Creation date',
        },
        price: {
            path: 'price',
            name: 'Price',
            component: (product) => getPrice(product.price)
        },
        remains: {
            path: 'remains',
            name: 'Remains'
        },
        weight: {
            path: 'weight',
            name: 'Weight/Volume',
            component: (product) => getWeight(product.weight)
        },
        actions: {
            path: 'actions',
            name: 'Actions',
            component: (product) => (
                <Actions
                    element={product}
                    handleDelete={handleDelete}
                    onCurrentProduct={onCurrentProduct}
                    onVisibleEdit={onVisibleEdit}
                />
            )
        }
    }
    return(
        <div className={styleBox.box__wrapper}>
            <div className={styleBox.box}>
                <table>
                    <TableHeader columns={columns}/>
                    <TableBody columns={columns} items={products}/>
                </table>
            </div>
        </div>
    );
};

export default ProductsTable;