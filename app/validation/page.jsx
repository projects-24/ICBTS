
"use client"
import React, { useEffect , useState } from 'react';
import Navigation from "@/components/Navigation";
import MainContent from "@/components/content";
import Grid from "funuicss/ui/grid/Grid";
import Col from "funuicss/ui/grid/Col";
import Card from "funuicss/ui/card/Card";
import Text from "funuicss/ui/text/Text";
import data from "@/components/data";
import Section from "funuicss/ui/specials/Section";
import Table from "funuicss/ui/table/Table";
import dynamic from "next/dynamic";
import Axios  from 'axios';
import { URI } from '@/functions/endpoint';
const MainChart = dynamic(()=>import("@/components/MainGraph") ,{ssr:false})
const Chart = dynamic(()=>import("@/components/Graph") ,{ssr:false})
const GraphChart = dynamic(() => import("@/components/RangeGraph"), { ssr: false })
import Input from 'funuicss/ui/input/Input' 
import RowFlex from 'funuicss/ui/specials/RowFlex'
import { PiCheck, PiEye, PiX } from 'react-icons/pi';
import Circle from "funuicss/ui/specials/Circle"
import Modal from 'funuicss/ui/modal/Modal'
const Statistics = ()=>{

const [outlier_data, setoutlier_data] = useState(null) 
const [outlier_year_month, setoutlier_year_month] = useState({'year' : 2023 ,  'month' : 12})
const [active_tab, setactive_tab] = useState(1)

const GetOutlier = (req) => {
  if(active_tab == 1){
    let data = {
      "data": [
        {
          id: 1,
          name: "John Doe",
          team: "Alpha",
          region: "North",
          border: "JEWAY WHARF BORDER",
          total_submission: 12,
          percent_change:  "29%"
        },
        {
          id: 2,
          name: "Jane Smith",
          team: "Bravo",
          region: "East",
          border: "JEWAY WHARF BORDER",
          total_submission: 10,
          percent_change:  "80%"
        },
        {
          id: 3,
          name: "Michael Johnson",
          team: "Charlie",
          region: "West",
          border: "ELUBO BORDER",
          total_submission: 8,
          percent_change:  "49%"
        },
        {
          id: 4,
          name: "Emily Davis",
          team: "Delta",
          region: "South",
          border: "ELUBO BORDER",
          total_submission: 15,
          percent_change: "29%"
        }
      ],
      "titles": ["ID", "Name", "Team", "Region", "Border", "Total submission", "Status"],
      "fields": ["id", "name", "team", "region", "border", "total_submission"]
    }
    setoutlier_data(data)
  }
}

useEffect(() => {
    GetOutlier(outlier_year_month)
}, [])

const HandleOutlierQuery = (year_month) => {
    let year , month 
    year = year_month.slice(0 , year_month.indexOf("-")) 
    month = year_month.slice(-2) 
    setoutlier_year_month({year , month})
    new Promise((resolve, reject) => {
        setoutlier_data(null)
        resolve()
    })
    .then(res =>  GetOutlier({'year' : year ,  'month' : month}))

}


const [selected_data, setselected_data] = useState("")
const [viewModal, setviewModal] = useState(false)

return (
        <div>
            <Navigation title={"Statistics"} active={3} />
            <MainContent>

          {
            selected_data && 
            <Modal
            open={viewModal}
    maxWidth='1000px'
    animation='SlideDown'
    flat
    close={<PiX size={30} className='pointer hover-text-error' onClick={() => setviewModal(false)}/>}
    title={
<>
<Text heading='h5' bold text={selected_data.interviewer_name} block/>
  <Text bold text={selected_data.establishment_name} size='small' color="primary"/>
</>
  }
            body={<>
              <Grid>
  <Col sm={6} md={4} lg={4} funcss='padding'>
    <Text size='small' bold color="primary" text="Interviewer ID" block/>
    <Text size='minified'  text={selected_data.interviewer_id} block/>
  </Col>
  <Col sm={6} md={4} lg={4} funcss='padding'>
    <Text size='small' bold color="primary" text="Interviewer" block/>
    <Text size='minified'  text={selected_data.interviewer_name} block/>
  </Col>
  <Col sm={6} md={4} lg={4} funcss='padding'>
    <Text size='small' bold color="primary" text="Establishment" block/>
    <Text size='minified'  text={selected_data.establishment_name} block/>
  </Col>
  </Grid>
  <Section gap={1} funcss='bb'/>
  <Grid>
  <Col sm={6} md={4} lg={4} funcss='padding'>
    <Text size='small' bold color="primary" text="Firm ID" block/>
    <Text size='minified'  text={selected_data.firm_id} block/>
  </Col>
  <Col sm={6} md={4} lg={4} funcss='padding'>
    <Text size='small' bold color="primary" text="Product ID" block/>
    <Text size='minified'  text={selected_data.product_id} block/>
  </Col>
  <Col sm={6} md={4} lg={4} funcss='padding'>
    <Text size='small' bold color="primary" text="Firm Product ID" block/>
    <Text size='minified'  text={selected_data.firm_product_id} block/>
  </Col>
  <Col sm={12} md={12} lg={12} funcss='padding'>
    <Text size='small' bold color="primary" text="Firm Product Description" block funcss="margin-bottom-5"/>
    <div className="padding-20 dark800 roundEdgeSmall text-dark300">
    <Text size='minified'  text={selected_data.firm_product_description} article block/>
    </div>
  </Col>
  </Grid>
  <Section gap={1} funcss='bb'/>
  <Grid>
  <Col sm={6} md={4} lg={4} funcss='padding'>
    <Text size='small' bold color="primary" text="Year" block/>
    <Text size='minified'  text={selected_data.selected_year} block/>
  </Col>
  <Col sm={6} md={4} lg={4} funcss='padding'>
    <Text size='small' bold color="primary" text="Month" block/>
    <Text size='minified'  text={selected_data.Current_month} block/>
  </Col>
  <Col sm={6} md={4} lg={4} funcss='padding'>
    <Text size='small' bold color="primary" text="Currency" block/>
    <Text size='minified'  text={selected_data.product_currency} block/>
  </Col>
  </Grid>
  <Section gap={1} funcss='bb'/>
  <Grid>
  <Col sm={6} md={3} lg={3} funcss='padding'>
    <Text size='small' bold color="primary" text="Current Month Price" block/>
    <Text size='minified'  text={selected_data.current_monthly_price} block/>
  </Col>
  <Col sm={6} md={3} lg={3} funcss='padding'>
    <Text size='small' bold color="primary" text="Prev Month" block/>
    <Text size='minified'  text={selected_data.previous_monthly_price} block/>
  </Col>
  <Col sm={6} md={3} lg={3} funcss='padding'>
    <Text size='small' bold color="primary" text="Price Difference" block/>
    <Text size='minified'  text={selected_data.price_difference} block/>
  </Col>
  <Col sm={6} md={3} lg={3} funcss='padding'>
    <Text size='small' bold color="primary" text="Percentage Change" block/>
    <Text size='minified'  text={selected_data.percent_change} bold  block/>
  </Col>
  </Grid>
  <Section gap={1} funcss='bb'/>
 
            </>}
            />
          }
  
          
          <RowFlex gap={1} funcss='tab-container'>
            <div className={active_tab == 1 ? "active tab" : 'tab'} onClick={() => setactive_tab(1)}>
              Submission
            </div>
            <div className={active_tab == 2 ? "active tab" : 'tab'} onClick={() => setactive_tab(2)}>
              Duplicate Cases
            </div>
            <div className={active_tab == 3 ? "active tab" : 'tab'} onClick={() => setactive_tab(3)}>
              Wrong Dates
            </div>
            <div className={active_tab == 4 ? "active tab" : 'tab'} onClick={() => setactive_tab(4)}>
            High Order Specify
            </div>
            <div className={active_tab == 5 ? "active tab" : 'tab'} onClick={() => setactive_tab(5)}>
            very high quantity
            </div>
            <div className={active_tab == 6 ? "active tab" : 'tab'} onClick={() => setactive_tab(6)}>
           very high weights
            </div>
            <div className={active_tab == 7 ? "active tab" : 'tab'} onClick={() => setactive_tab(7)}>
            Team Submissions
            </div>
          </RowFlex>
                <Section gap={2} />
                <Card
                style={{gap:0}}
                    header={<div className={"padding bb"}>
                       <Text 
                         heading={"h2"} 
                         text={active_tab == 1 ? 'Submission' : 
                          active_tab == 2 ? 'Dupicate Cases' : 
                          active_tab == 3 ? 'Wrong Dates' : 
                          active_tab == 4 ? 'High Order Specify' : 
                          active_tab == 5 ? ' interviwers very high quantity' : 
                          active_tab == 6 ? ' interviewers very high weights' : 
                          active_tab == 7 ? 'Team Submissions' : ''
                        
                        }
                         bold 
                         block
                         />
                    </div>}
                    xl
                    body={
                        <div className={""}>
                          {
                            outlier_data ?
                            <Table data={outlier_data}  funcss={"text-small"} pageSize={15}
                              customColumns={
                                [
                    {
                        title: 'Actions',
                        render: (data) => (
                          <div className='circular_loader_container  dark800'>
                              <div 
                              className={`circular_loader ${parseInt(data.percent_change.slice(0 , data.percent_change.indexOf("%"))) < 50 ? "green" : parseInt(data.percent_change.slice(0 , data.percent_change.indexOf("%"))) <= 75 ? "primary" : "error"}`} 
                              style={{height:data.percent_change}}>  </div>
                           </div>
                        ),
                      }
                   
                  ]
                }  
                            
                            />
                            : <div className='height-400 dark600 skeleton  padding-50' />
                          }
                        </div>
                    }

                />


            </MainContent>
        </div>
    )
}

export default Statistics
