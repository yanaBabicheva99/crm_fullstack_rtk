import React, {useState, useEffect} from 'react';


export const useBar = (arrOptions) => {

    const days = {
        '0': 'Mon',
        '1': 'Tue',
        '2': 'Wed',
        '3': 'Thu',
        '4': 'Fri',
        '5': 'Sat',
        '6': 'Sun'
    };

    const [soldProductsDays, setSoldProductsDays] = useState([]);
    const [soldProductsValues, setSoldProductsValues] = useState([]);

    let dataDays = [];
    let dataValues = [];

    const getProductsInfo = (day) => {
        const soldProducts = arrOptions.filter(product => product.day === day);
        dataDays.push(day);
        if (soldProducts.length === 0) {
            dataValues.push(0)
        }
        else {
            const amountProducts = soldProducts.reduce((total, item) => total + item.quantity, 0)
             dataValues.push(amountProducts)
        }
    }


    useEffect(() => {
         dataDays = [];
         dataValues = [];

        Object.keys(days).forEach(day => getProductsInfo(days[day]));

        setSoldProductsDays(dataDays);
        setSoldProductsValues(dataValues);

    }, [arrOptions]);

    const options = {
        title: {
            text: 'Sales Overview',
            subtext: 'Graph sales for all daysnby',
            left: 'center',
            color: '#2B3844',
            textStyle: {
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: 'Inter',
            },
            subtextStyle: {
                fontSize: 12,
                fontFamily: 'Inter',
            },
        },
        grid: {
            left: '4%',
            bottom: 32,
            width: '90%',
            height: '80%',
            show: true,
            containLabel: true,
            borderColor: 'rgba(232, 235, 239, 0.4)',

        },
        xAxis: {
            type: 'category',
            // offset: 20,

            axisLine: {
                show: false
            },

            axisTick: {
                alignWithLabel: false,
                show: false
            },

            axisLabel: {
                margin: 27,
                fontSize: 12,
            },

            data: soldProductsDays
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                type: 'bar',
                right: -40,
                top: 50,
                data: soldProductsValues,
            },

        ]
    };

    return {soldProductsDays, options}
};

