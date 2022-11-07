import React from "react";
import ReactECharts from 'echarts-for-react';

import {useBar} from "./useBar";


export const Bar = ({arrOptions}) => {
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