import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import TableHeader from '../tableHeader/TableHeader';
import TableBody from '../tableBody/TableBody';
import { getPrice, getWeight } from '../../../utils/Products';
import { AuthContext } from '../../../context/AuthContext';
import { useGetUserQuery } from '../../../service/UserServices';

import styleBox from '../Table.module.scss';

const SalesTable = ({sellProducts}) => {
    const {userId} = useContext(AuthContext);
    const {data: userData, error, isLoading: loading} = useGetUserQuery(userId);

    if (loading) {
        return <h2>Loading...</h2>
    }

    const [user] = userData;

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
        quantity: {
            path: 'quantity',
            name: 'Sold items'
        },
        weight: {
            path: 'weight',
            name: 'Weight/Volume',
            component: (product) => getWeight(product.weight)
        },
        lastSale: {
            path: 'lastSale',
            name: 'Last sale',
        },
    }
    return(
        <div className={styleBox.box__wrapper}>
            <div className={styleBox.box}>
                <table>
                    <TableHeader columns={columns}/>
                    <TableBody columns={columns} items={sellProducts}/>
                </table>
            </div>
        </div>
    );
};

export default SalesTable;