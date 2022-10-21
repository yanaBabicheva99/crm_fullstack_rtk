
import ReactECharts from 'echarts-for-react';
import React from "react";
import {usePie} from "./usePie";
import style from "../../pages/main/Main.module.scss";

export const Pie = ({arrOptions}) => {
     const {soldProducts, options} = usePie(arrOptions);

    return (
        <>
            {soldProducts.length !== 0 && (
                    <div className={style.statistics__day}>
                        <ReactECharts option={options}/>
                    </div>
                )
            }
        </>
    )
}