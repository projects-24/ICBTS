'use client';
import React, { useEffect } from 'react'
import CanvasJSReact from '@canvasjs/charts';
import RowFlex from "funuicss/ui/specials/RowFlex"
import Text from "funuicss/ui/text/Text"

function Chart({id , data , title, height}) {
    useEffect(() => {
        const chart = new CanvasJSReact.Chart(id, {
          animationEnabled: true,
          title: {
            // text: title,
            horizontalAlign: "left"
          },
          data: [{
            type: "doughnut",
            startAngle: 60,
            // innerRadius: 60,
            indexLabelFontSize: 17,
            indexLabel: "{label} - #percent%",
            toolTipContent: "<b>{label}:</b> {y} (#percent%)",
            dataPoints: data
          }]
        });
        chart.render();
      }, []);



    return (
        <div>
              <div id={id} className='lighter' style={{ height: height ? height : '300px', width: '100%' }}></div>
              <RowFlex gap={1} funcss=' margin-top-20 bt padding-top-20 '>

{
    data.map(( doc) => (
      <div className="col fit" key={doc.label}>
          <div className='border padding ' >
          <Text text={doc.label} block size="minified" uppercase/>
            <Text text={doc.y ? doc.y : doc.x ? doc.x : doc.y} bold/>
        </div>
      </div>
    ))
}

</RowFlex>
        </div>
  )
}

export default Chart