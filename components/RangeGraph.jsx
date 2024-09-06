'use client';
import React, { useEffect } from 'react'
import CanvasJSReact from '@canvasjs/charts';

function RangeGraph({id, graphData, title}){
    useEffect( ()=>{
        const rangeChart = new CanvasJSReact.Chart(id, {
            theme: "light",
            animationEnabled: true,
            title: {
                text: "Price Change  more than 20% (Outliers)"
            },
            axisY:{
                title: "Price Change",
                suffix: "%"
            },
            data: [{
                type: "rangeColumn",
                yValueFormatString: "GHC#,##0.00",
                xValueFormatString: "MMM YYYY",
                toolTipContent: "{x}<br>High: {y[0]}<br>Low: {y[1]}",
                dataPoints:graphData
            }]
        })
    }, []);

    return (
        <div>
            <div id={id} className='lighter' style={{ height: '250px', width: '100%' }}></div>
        </div>
    )

}

export default RangeGraph;