import ReactECharts from 'echarts-for-react';
import React from "react";
import {useBar} from "./useBar";


export const Bar = ({arrOptions}) => {
    console.log(arrOptions);
    const {soldProductsDays, options} = useBar(arrOptions);

    return (
        <>
            {soldProductsDays.length !== 0 &&
                <ReactECharts
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    option={options}
                />
            }
        </>
    )
}