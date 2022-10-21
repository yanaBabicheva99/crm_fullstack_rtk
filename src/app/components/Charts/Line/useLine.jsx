import {useEffect, useState} from "react";


export const useLine = (arrOptions) => {

    const day = String(new Date().getDay());

    const days = {
        '1': 'Mon',
        '2': 'Tue',
        '3': 'Wed',
        '4': 'Thu',
        '5': 'Fri',
        '6': 'Sat',
        '0': 'Sun'
    };

    const [amountSoldProducts, setAmountSoldProducts] = useState([]);

    useEffect(() => {
        const soldProductsToday = arrOptions.filter(product => product.day === days[day]);

        if (soldProductsToday.length === 0) {
            return;
        }

        const data = soldProductsToday.map(product => product.quantity * product.price);
        const totalAmount = data.reduce((total, item) => total + item, 0);
        setAmountSoldProducts(data);
    }, [arrOptions]);

    const options = {
        title: {
            text: 'Total earned',
            left: 'left',
            color: '#2B3844',
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