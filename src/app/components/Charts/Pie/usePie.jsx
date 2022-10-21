import React, {useState, useEffect} from 'react';


export const usePie = (arrOptions) => {

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

    const [soldProducts, setSoldProducts] = useState([]);

    useEffect(() => {
        const soldProductsToday = arrOptions.filter(product => product.day === days[day]);
        const data = soldProductsToday.map(product => {
            return {
                value: product.quantity,
                name: product.productName
            }
        });
        setSoldProducts(data)
    }, [arrOptions]);

    const options = {
        title: {
            text: 'Sales schedule by day',
            left: 'left',
            color: '#2B3844',
            textStyle: {
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: 'Inter',
            },
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            icon: 'circle',
            top: '23%',
            orient: 'vertical',
            itemWidth: 10,
            right: '25%',
            itemGap: 33,
            color: '#2B3844',
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['0%', '70%'],
                left: -20,
                bottom: 50,
                width: 250,
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                    }
                },
                labelLine: {
                    show: false
                },
                data: soldProducts
            }
        ]
    }

    return {soldProducts, options}
};


