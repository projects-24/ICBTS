'use client';
import React, { useEffect, useState } from 'react'
import CanvasJSReact from '@canvasjs/charts';
import Grid from "funuicss/ui/grid/Grid"
import Col from "funuicss/ui/grid/Col"
import RowFlex from "funuicss/ui/specials/RowFlex"
import Text from "funuicss/ui/text/Text"
function Bar_Chart({id, data}) {

 
    useEffect(() => {

        var chart = new CanvasJSReact.Chart(id ? id :  "bar_id", {
            animationEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            title: {
                text: " "
            },
            axisY: {
                title: "",
            },
            axisX: {
                title: ""
            },
            data: [{
                type: "column",
        
                dataPoints: data
            }]
        });
        chart.render();
    }, []);



    return (
        <div >
            <div id={id ? id :  "bar_id"} style={{ height: '250px', width: '100%' }}></div>
            <Grid funcss="padding bt central">

                {
                    data.map(( doc) => (
                      <div className="padding" key={doc.label}>
                          <div className='border padding roundEdgeSmall' >
                          <Text text={doc.label} block size="minified" funcss='headline'/>
                            <Text text={doc.y ? doc.y : doc.x ? doc.x : doc.y} bold/>
                        </div>
                      </div>
                    ))
                }
                
            </Grid>
        </div>
    )
}

export default Bar_Chart