"use client";
import React, {useEffect, useState} from 'react';
import Link from 'next/link'
import { PiChecks, PiCopy, PiDiamondsFour, PiList, PiTrash } from 'react-icons/pi';
import Text from 'funuicss/ui/text/Text'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import Div from "funuicss/ui/div/Div"
import Grid from 'funuicss/ui/grid/Grid'
import Col from 'funuicss/ui/grid/Col'
import dynamic from 'next/dynamic'
import {PiArrowDown, PiArrowUp, PiUsersDuotone,  PiVoicemailDuotone} from 'react-icons/pi'
import { MdDeleteForever } from "react-icons/md";
import Navigation from "@/components/Navigation";
import MainContent from "@/components/content";
import Card from "funuicss/ui/card/Card";
import Section from "funuicss/ui/specials/Section";
import Axios from "axios"
import { URI , URI2 } from '@/functions/endpoint';

const MainGraph = dynamic(()=>import("@/components/MainGraph") ,{ssr:false})
const Bar_Chart = dynamic(()=>import("@/components/Bar") ,{ssr:false})


export default function Home() {
  
    const [data, setdata] = useState(null)
    const [data_state, setdata_state] = useState(false)

    useEffect(() => {
      Axios.get(URI2 + "/regionalsummary")
      .then((res) => {
        let data 
        data = res.data
        setdata(data)
        setdata_state(true)
        console.log(data)
      })
      .catch(err => {
        console.log(err)
        setdata_state ( () => !data_state )
      })
    }, [data_state])


    const [border_summary, setborder_summary] = useState(null)
const [border_summary_state, setborder_summary_state] = useState(false)

useEffect(() => {
  Axios.get(URI2 + "/bordersummary")
  .then((res) => {
    let border_summary 
    border_summary = res.data
    setborder_summary(border_summary)
    setborder_summary_state(true)
    console.log(border_summary)
  })
  .catch(err => {
    console.log(err)
    setborder_summary_state ( () => !border_summary_state )
  })
}, [border_summary_state])

    const [dashboard_data, setdashboard_data] = useState(null)
    useEffect(() => {
    Axios.get(URI2 + "/summary")
    .then(res => {
        let res_data = res.data 
        setdashboard_data(res_data)
        console.log(res_data)
    })
    }, [])
    


    return (
        <div >
            <Navigation active={1} />
            <MainContent >
             <div className={"padding-left-20 padding-right-20"}>
                  <Div  margin="2rem 0 2rem 0">
                      <RowFlex alignItems="flex-start" justify="space-between" funcss={"padding"}>
                          <div>
                          <Text
                              text="Your Trade Matters"
                              funcss='headline'
                              color="dark200"
                              block
                          />
                          <Text
                              text="Informal Cross Border Trade Survey"
                              color="dark200"
                              heading='h2'
                              block
                          />
                          </div>
                          {
                            dashboard_data && 
                           <div>
                            <Text 
                            text='Last Updated'
                            funcss='headline'
                            uppercase 
                            />
                            <Text 
                            text='00:00'
                            uppercase
                            block 
                            heading='h2' 
                            />
                           </div>
                          }

                      </RowFlex>
                      <Section />
                      <Div>
                  {
                    dashboard_data &&
                    <Grid>
               
              
                    <Col sm={12} md={6} lg={3} funcss='padding' >
                        <Card
                            xl
                            funcss='hover-up borderLeftPrimary'
                            body={
                                <RowFlex gap={1} funcss='padding-20' alignItems="flex-start">
                                    <Div content={<PiUsersDuotone size={15} className='text-dark' />} funcss={"central roundEdge  dark800"} raised height="2.5rem" width='2.5rem' />
                                    <Div>
                                        <Text funcss='headline' text={"Total Cases"} size='smaller' color='dark400' block bold />
                                        <RowFlex gap={0.5}>
                                            <Text heading='h3' text={dashboard_data.TotalCases} color='dark200' />
                                        </RowFlex>
                                    </Div>
                                </RowFlex>
                            }
                        />
                    </Col>
 
                    <Col sm={12} md={6} lg={3} funcss='padding' >
                        <Card
                            xl
                            funcss='hover-up borderLeftSuccess'
                            body={
                                <RowFlex gap={1} funcss='padding-20' alignItems="flex-start">
                                    <Div content={<PiChecks size={15} className='text-dark'/>} funcss={"central roundEdge  dark800"} raised height="2.5rem" width='2.5rem' />
                                    <Div>
                                        <Text funcss='headline' text={"Completed Cases"} size='smaller' color='dark400' block bold />
                                        <RowFlex gap={0.5}>
                                            <Text heading='h3' text={dashboard_data.CompletedCases} color='dark200' />
                                          
                                        </RowFlex>
                                    </Div>
                                </RowFlex>
                            }
                        />
                    </Col>
               
                    <Col sm={12} md={6} lg={3} funcss='padding' >
                        <Card
                            xl
                            funcss='hover-up borderLeftError'
                            body={
                                <RowFlex gap={1} funcss='padding-20' alignItems="flex-start">
                                    <Div content={<PiCopy size={15} className='text-dark' />} funcss={"central roundEdge  dark800"} raised height="2.5rem" width='2.5rem' />
                                    <Div>
                                        <Text funcss='headline' text={"Duplicate Cases"} size='smaller' color='dark400' block bold />
                                        <RowFlex gap={0.5}>
                                            <Text heading='h3' text={dashboard_data.DuplicateCases} color='dark200' />
                                          
                                        </RowFlex>
                                    </Div>
                                </RowFlex>
                            }
                        />
                    </Col>
                     
                    <Col sm={12} md={6} lg={3} funcss='padding' >
                        <Card
                            xl
                            funcss='hover-up borderLeftError'
                            body={
                                <RowFlex gap={1} funcss='padding-20' alignItems="flex-start">
                                    <Div content={<PiTrash size={15} className='text-dark' />} funcss={"central roundEdge  dark800"} raised height="2.5rem" width='2.5rem' />
                                    <Div>
                                        <Text funcss='headline' text={"Rejected by Supervisor"} size='smaller' color='dark400' block bold />
                                        <RowFlex gap={0.5}>
                                            <Text heading='h3' text={dashboard_data.CasesWithErrors} color='dark200' />
                                          
                                        </RowFlex>
                                    </Div>
                                </RowFlex>
                            }
                        />
                    </Col>
            </Grid>
                  }
                      </Div>
              </Div>


<div>
    <Card
        header={<div className={"padding bb"}>
            <Text heading={"h3"} text={"Regional Summary"} bold block/>
        </div>}
        xl
        body={<div>
          {
            data ?
            <MainGraph data={data} />
            : <div className='height-400 dark700 skeleton' />
          }
        </div>}

        />
    <Card
    funcss='margin-top-40'
        header={<div className={"padding bb"}>
            <Text heading={"h3"} text={"Border Summary"} bold block/>
        </div>}
        xl
        body={<div>
          {
            border_summary ?
            <Bar_Chart id={'border_summary'} data={border_summary} />
            : <div className='height-400 dark700 skeleton' />
          }
        </div>}

        />
</div>


             </div>
            </MainContent>
        </div>
      )
    }
