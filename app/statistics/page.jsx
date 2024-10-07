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
import { URI, URI2 } from '@/functions/endpoint';
const MainChart = dynamic(()=>import("@/components/MainGraph") ,{ssr:false})
const Chart = dynamic(()=>import("@/components/Graph") ,{ssr:false})
const GraphChart = dynamic(() => import("@/components/RangeGraph"), { ssr: false })
import Input from 'funuicss/ui/input/Input' 
import RowFlex from 'funuicss/ui/specials/RowFlex'
import { PiEye } from 'react-icons/pi';
import Circle from "funuicss/ui/specials/Circle"
const Statistics = ()=>{


const [reader_by_month_data, setreader_by_month_data] = useState(null)
const [reader_year_month, setreader_year_month] = useState({'year' : 2024 ,  'month' : 10})


const [productionstatus_year_month, setproductionstatus_year_month] = useState({'year' : 2024 ,  'month' : 10})
const [gender_data, setgender_data] = useState(null)

const [total_records_year_month, settotal_records_year_month] = useState({'year' : 2024 ,  'month' : 10})
const [transport_summary, settransport_summary] = useState(null)



const GetReaderByMonth = (req) => {
    Axios.get(URI + `/readerbymonth/${req.year}/${req.month}`)
    .then(res => {
        let getDocs , data  
        getDocs = res.data 
        data = {
            "data": getDocs,
            "titles": [ "Interviewer ID", "Interviewer", "Month", "Year" , "Submitted" ],
            "fields": ["interviewer_id", 'interviewer_name' , "month", "fp01y" , "records_submitted"],
          }
        setreader_by_month_data(data)
    })
}
const GetGender = (req) => {
    Axios.get(URI2 + `/gender`)
    .then(res => {
        let getDocs , data  
        getDocs = res.data 
        data = getDocs
        setgender_data(data)
        console.log(data)
    GetTransportSummary(total_records_year_month)

    })
}


const GetTransportSummary = (req) => {
    Axios.get(URI2 + `/transportsummary`)
    .then(res => {
        let getDocs , data  
        getDocs = res.data 
        console.log(getDocs)
        settransport_summary(getDocs)
    })
}

useEffect(() => {
    GetGender(productionstatus_year_month)
    GetReaderByMonth(reader_year_month)
}, [])



const HandleReaderQuery = (year_month) => {
    let year , month 
    year = year_month.slice(0 , year_month.indexOf("-")) 
    month = year_month.slice(-2) 
    setreader_year_month({year , month})
    new Promise((resolve, reject) => {
        setreader_by_month_data(null)
        resolve()
    })
    .then(res =>  GetReaderByMonth({'year' : year ,  'month' : month}))

}
const HandleProductionQuery = (year_month) => {
    let year , month 
    year = year_month.slice(0 , year_month.indexOf("-")) 
    month = year_month.slice(-2) 
    setproductionstatus_year_month({year , month})
    new Promise((resolve, reject) => {
        setgender_data(null)
        resolve()
    })
    .then(res =>  GetGender({'year' : year ,  'month' : month}))
}
const HandleAllRecordsQuery = (year_month) => {
    let year , month 
    year = year_month.slice(0 , year_month.indexOf("-")) 
    month = year_month.slice(-2) 
    settotal_records_year_month({year , month})
    new Promise((resolve, reject) => {
        settransport_summary(null)
        resolve()
    })
    .then(res =>  GetTransportSummary({'year' : year ,  'month' : month}))
}
return (
        <div>
            <Navigation title={"Statistics"} active={2}/>
            <MainContent>
                <Grid>
                    <Col sm={12} md={12} lg={12} funcss={"padding"}>
                          <Card
                        style={{gap:0}}
                            header={<div className={"padding bb"}>
                            <RowFlex gap={1} justify="space-between">
                           <div>
                           <Text text={"Means of transport"} uppercase block/>
                        <div>
                        <Text 
                        heading={"h3"} 
                        text={` ${total_records_year_month.year} - ${total_records_year_month.month}`}
                        bold 
                        block
                        color="primary"
                        />
                        </div>
                           </div>
                           <RowFlex gap={1}>
                              <div>
                              <div>
                                   <Text 
                                   text="Month*"
                                   size="small"
                                   bold 
                                   color="dark200"
                                   />
                               </div>
                               <Input
                               select 
                               options={[
                                {
                                    "text": "Select",
                                    "value": ""
                                },
                                {
                                    "text": "Jan",
                                    "value": 1
                                },
                                {
                                    "text": "Feb",
                                    "value": 2
                                },
                                {
                                    "text": "Mar",
                                    "value": 3
                                },
                                {
                                    "text": "Apr",
                                    "value": 4
                                },
                                {
                                    "text": "May",
                                    "value": 5
                                },
                                {
                                    "text": "Jun",
                                    "value": 6
                                },
                                {
                                    "text": "Jul",
                                    "value": 7
                                },
                                {
                                    "text": "Aug",
                                    "value": 8
                                },
                                {
                                    "text": "Sep",
                                    "value": 9
                                },
                                {
                                    "text": "Oct",
                                    "value": 10
                                },
                                {
                                    "text": "Nov",
                                    "value": 11
                                },
                                {
                                    "text": "Dec",
                                    "value": 12
                                }

                               ]}
                               bordered
                               onChange={(e) => HandleAllRecordsQuery(e.target.value)}
                               />
                              </div>
                              <div>
                              <div>
                                   <Text 
                                   text="Week*"
                                   size="small"
                                   bold 
                                   color="dark200"
                                   />
                               </div>
                               <Input
                               select 
                               options={[
                                {
                                    'text':'Select',
                                    'value': ''
                                } ,
                                {
                                    'text':'Week 1',
                                    'value': 1
                                } ,
                                {
                                    'text':'Week 2',
                                    'value': 2
                                } ,
                                {
                                    'text':'Week 3',
                                    'value': 3
                                } ,


                               ]}
                               bordered
                               onChange={(e) => HandleAllRecordsQuery(e.target.value)}
                               />
                              </div>

                           </RowFlex>

                       </RowFlex>
                           </div>}
                            funcss=''
                            xl
                            body={
                                <div className={"height-300-min relative"}>
                                    {
                                        transport_summary ? 
                                    <MainChart data={transport_summary}/> 
                                    : <div className="skeleton  absolute fit dark800 Small"></div>
                                    }
                                </div>
                            }

                        />
                  
                    </Col>
                    <Col sm={12} md={6} lg={6} funcss={"padding"}>
                    <Card
                         style={{gap:0}}
                            header={<div className={"padding bb"}>
                             <RowFlex gap={1} justify="space-between">
                            <div>
                            <Text uppercase text={"Direction of trade"} block/>
                         <div>
                         <Text 
                         heading={"h3"} 
                         text={` ${productionstatus_year_month.year} - ${productionstatus_year_month.month}`}
                         bold 
                         block
                         color="primary"
                         />
                         </div>
                            </div>
                            <div>
                               <RowFlex gap={1}>
                              <div>
                              <div>
                                   <Text 
                                   text="Month*"
                                   size="small"
                                   bold 
                                   color="dark200"
                                   />
                               </div>
                               <Input
                               select 
                               options={[
                                {
                                    "text": "Select",
                                    "value": ""
                                },
                                {
                                    "text": "Jan",
                                    "value": 1
                                },
                                {
                                    "text": "Feb",
                                    "value": 2
                                },
                                {
                                    "text": "Mar",
                                    "value": 3
                                },
                                {
                                    "text": "Apr",
                                    "value": 4
                                },
                                {
                                    "text": "May",
                                    "value": 5
                                },
                                {
                                    "text": "Jun",
                                    "value": 6
                                },
                                {
                                    "text": "Jul",
                                    "value": 7
                                },
                                {
                                    "text": "Aug",
                                    "value": 8
                                },
                                {
                                    "text": "Sep",
                                    "value": 9
                                },
                                {
                                    "text": "Oct",
                                    "value": 10
                                },
                                {
                                    "text": "Nov",
                                    "value": 11
                                },
                                {
                                    "text": "Dec",
                                    "value": 12
                                }

                               ]}
                               bordered
                               onChange={(e) => HandleAllRecordsQuery(e.target.value)}
                               />
                              </div>
                              <div>
                              <div>
                                   <Text 
                                   text="Week*"
                                   size="small"
                                   bold 
                                   color="dark200"
                                   />
                               </div>
                               <Input
                               select 
                               options={[
                                {
                                    'text':'Select',
                                    'value': ''
                                } ,
                                {
                                    'text':'Week 1',
                                    'value': 1
                                } ,
                                {
                                    'text':'Week 2',
                                    'value': 2
                                } ,
                                {
                                    'text':'Week 3',
                                    'value': 3
                                } ,


                               ]}
                               bordered
                               onChange={(e) => HandleAllRecordsQuery(e.target.value)}
                               />
                              </div>

                           </RowFlex>
                            </div>
                        </RowFlex>
                            </div>}
                            funcss=''
                            xl
                            body={
                                <div className={"padding-20 height-300-min"}>
                                    {
                                
                                    <Chart title={"Heading One"} data={[
                                        {
                                            "y": 1771,
                                            "label": "Imports"
                                        },
                                        {
                                            "y": 55,
                                            "label": "Exports"
                                        }
                                    ]} id={"p1"}  height={"220px"}/>
                                    }
                                </div>
                            }

                        />
                  
                    </Col>
{/* 
                    <Col sm={12} md={6} lg={6} funcss="padding">
                        <Card
                         style={{gap:0}}
                            header={<div className={"padding bb"}>
                             <RowFlex gap={1} justify="space-between">
                            <div>
                            <Text text={"Category of commodity"} uppercase block/>
                         <div>
                         <Text 
                         heading={"h3"} 
                         text={` ${productionstatus_year_month.year} - ${productionstatus_year_month.month}`}
                         bold 
                         block
                         color="primary"
                         />
                         </div>
                            </div>
                            <div>
                            <RowFlex gap={1}>
                              <div>
                              <div>
                                   <Text 
                                   text="Month*"
                                   size="small"
                                   bold 
                                   color="dark200"
                                   />
                               </div>
                               <Input
                               select 
                               options={[
                                {
                                    "text": "Select",
                                    "value": ""
                                },
                                {
                                    "text": "Jan",
                                    "value": 1
                                },
                                {
                                    "text": "Feb",
                                    "value": 2
                                },
                                {
                                    "text": "Mar",
                                    "value": 3
                                },
                                {
                                    "text": "Apr",
                                    "value": 4
                                },
                                {
                                    "text": "May",
                                    "value": 5
                                },
                                {
                                    "text": "Jun",
                                    "value": 6
                                },
                                {
                                    "text": "Jul",
                                    "value": 7
                                },
                                {
                                    "text": "Aug",
                                    "value": 8
                                },
                                {
                                    "text": "Sep",
                                    "value": 9
                                },
                                {
                                    "text": "Oct",
                                    "value": 10
                                },
                                {
                                    "text": "Nov",
                                    "value": 11
                                },
                                {
                                    "text": "Dec",
                                    "value": 12
                                }

                               ]}
                               bordered
                               onChange={(e) => HandleAllRecordsQuery(e.target.value)}
                               />
                              </div>
                              <div>
                              <div>
                                   <Text 
                                   text="Week*"
                                   size="small"
                                   bold 
                                   color="dark200"
                                   />
                               </div>
                               <Input
                               select 
                               options={[
                                {
                                    'text':'Select',
                                    'value': ''
                                } ,
                                {
                                    'text':'Week 1',
                                    'value': 1
                                } ,
                                {
                                    'text':'Week 2',
                                    'value': 2
                                } ,
                                {
                                    'text':'Week 3',
                                    'value': 3
                                } ,


                               ]}
                               bordered
                               onChange={(e) => HandleAllRecordsQuery(e.target.value)}
                               />
                              </div>

                           </RowFlex>
                            </div>
                        </RowFlex>
                            </div>}
                            funcss=''
                            xl
                            body={
                                <div className={"padding-20 height-300-min"}>
                                 
                                    <Chart  data={[
                                        {
                                            "y": 1771,
                                            "label": "Life stock "
                                        },
                                        {
                                            "y": 55,
                                            "label": "Non-Life stock"
                                        }
                                    ]} id={"p2"}  height={"220px"}/>
                                </div>
                            }

                        />
                    </Col> */}
                    <Col sm={12} md={6} lg={6} funcss="padding">
                        <Card
                         style={{gap:0}}
                            header={<div className={"padding bb"}>
                             <RowFlex gap={1} justify="space-between">
                            <div>
                            <Text text={"Gender of traders"} uppercase block/>
                         <div>
                         <Text 
                         heading={"h3"} 
                         text={` ${productionstatus_year_month.year} - ${productionstatus_year_month.month}`}
                         bold 
                         block
                         color="primary"
                         />
                         </div>
                            </div>
                            <div>
                            <RowFlex gap={1}>
                              <div>
                              <div>
                                   <Text 
                                   text="Month*"
                                   size="small"
                                   bold 
                                   color="dark200"
                                   />
                               </div>
                               <Input
                               select 
                               options={[
                                {
                                    "text": "Select",
                                    "value": ""
                                },
                                {
                                    "text": "Jan",
                                    "value": 1
                                },
                                {
                                    "text": "Feb",
                                    "value": 2
                                },
                                {
                                    "text": "Mar",
                                    "value": 3
                                },
                                {
                                    "text": "Apr",
                                    "value": 4
                                },
                                {
                                    "text": "May",
                                    "value": 5
                                },
                                {
                                    "text": "Jun",
                                    "value": 6
                                },
                                {
                                    "text": "Jul",
                                    "value": 7
                                },
                                {
                                    "text": "Aug",
                                    "value": 8
                                },
                                {
                                    "text": "Sep",
                                    "value": 9
                                },
                                {
                                    "text": "Oct",
                                    "value": 10
                                },
                                {
                                    "text": "Nov",
                                    "value": 11
                                },
                                {
                                    "text": "Dec",
                                    "value": 12
                                }

                               ]}
                               bordered
                               onChange={(e) => HandleAllRecordsQuery(e.target.value)}
                               />
                              </div>
                              <div>
                              <div>
                                   <Text 
                                   text="Week*"
                                   size="small"
                                   bold 
                                   color="dark200"
                                   />
                               </div>
                               <Input
                               select 
                               options={[
                                {
                                    'text':'Select',
                                    'value': ''
                                } ,
                                {
                                    'text':'Week 1',
                                    'value': 1
                                } ,
                                {
                                    'text':'Week 2',
                                    'value': 2
                                } ,
                                {
                                    'text':'Week 3',
                                    'value': 3
                                } ,


                               ]}
                               bordered
                               onChange={(e) => HandleAllRecordsQuery(e.target.value)}
                               />
                              </div>

                           </RowFlex>
                            </div>
                        </RowFlex>
                            </div>}
                            funcss=''
                            xl
                            body={
                                <div className={"padding-20 height-300-min"}>
                                    {
                                        gender_data &&
                                    <Chart title={"Heading One"} data={gender_data} id={"p3"}  height={"220px"}/>
                                    }
                                </div>
                            }

                        />
                    </Col>


                </Grid>

        
            </MainContent>
        </div>
    )
}

export default Statistics

