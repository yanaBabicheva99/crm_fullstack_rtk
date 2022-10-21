import React from 'react';
import {getPrice, getWeight} from "../../../utils/Products";
import Actions from "../../actions/Actions";
import TableHeader from "../tableHeader/TableHeader";
import TableBody from "../tableBody/TableBody";
import {useUser} from "../../../hooks/useUser";
import {Link} from "react-router-dom";

const ProductsTable = ({products, handleDelete, onCurrentProduct, onVisibleEdit}) => {
    const {user} = useUser();
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
        <table>
           <TableHeader columns={columns} />
           <TableBody columns={columns} items={products}/>
        </table>
    );
};

export default ProductsTable;