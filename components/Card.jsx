import React from 'react'
import Card from 'funuicss/ui/card/Card'
import Text from 'funuicss/ui/text/Text'
export default function SectionCard({heading, sub_heading, body}) {
  return (
    <Card
    funcss="roundEdge padding"
    xl
    header={<div className='bb padding-bottom-10'>
    <Text 
    text={heading}
    heading="h4"
    bold 
    color="dark300"
    block
    />
    <Text 
    text={sub_heading}
    color="dark400"
    size="minified"
    />
    </div>}

    body={body || ""}
    />
  )
}
