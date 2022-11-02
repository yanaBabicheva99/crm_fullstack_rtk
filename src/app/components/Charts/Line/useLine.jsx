import {useEffect, useState} from "react";
import { getData } from '../../../utils/Products';


export const useLine = (arrOptions) => {

    const dayNow = getData();

    const [amountSoldProducts, setAmountSoldProducts] = useState([]);

    useEffect(() => {
        const soldProductsToday = arrOptions.filter(product => product.lastSale === dayNow);

        if (soldProductsToday.length === 0) {
            return;
        }

        const data = soldProductsToday.map(product => product.quantity * product.price);
        const totalAmount = data.reduce((total, item) => total + item, 0);
        setAmountSoldProducts([0, ...data]);
    }, [arrOptions]);

    const options = {
        title: {
            text: 'Total earned',
            left: 'left',
            color: '#2B3844',
            top: '0px',
            textStyle: {
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: 'Inter',
            },
        },
        xAxis: {
            show: false,
            type: 'category',
            data: amountSoldProducts,
        },
        yAxis: {
            type: 'value',
            show: false
        },
        axisPointer: {
            show: false,
            type: 'none',
        },
        series: [
            {
                data: amountSoldProducts,
                type: 'line',
                color: '#1CAF7F'
            }
        ]
    };

    return {amountSoldProducts, options}
}