
import ReactECharts from "echarts-for-react";
import React from "react";
import {useLine} from "./useLine";
import style from "../../pages/main/Main.module.scss";

export const Line = ({arrOptions}) => {
    const {amountSoldProducts, options} = useLine(arrOptions);

    return (
        <>
            {amountSoldProducts.length !== 0 && (
                <div className={style.statistics__day}>
                    <ReactECharts option={options}/>
                </div>)
            }
        </>
    )
}