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
import { PiCheck, PiEye, PiX } from 'react-icons/pi';
import Circle from "funuicss/ui/specials/Circle"
import Modal from 'funuicss/ui/modal/Modal'
const Statistics = ()=>{

const [outlier_data, setoutlier_data] = useState(null) 
const [active_tab, setactive_tab] = useState(1)

const GetOutlier = (req) => {
  Axios.get(URI2 + req)
  .then(res => {
      let getDocs , data  
      getDocs = res.data 
      data = getDocs

      if(active_tab == 1){
        let docs = {
          "data": data,
          "titles": ["Name", "Team", "Region", "Border", "Total submission"],
          "fields": ["Name", "Team", "Region", "Border", "NumberOfSubmission"]
        }
        setoutlier_data(docs)
      }
  })


  
}

useEffect(() => {
    GetOutlier('/submissionsummary')
}, [])



const [selected_data, setselected_data] = useState("")
const [viewModal, setviewModal] = useState(false)

return (
        <div>
            <Navigation title={"Statistics"} active={3} />
            <MainContent>
          
          <RowFlex gap={1} funcss='tab-container'>
            <div className={active_tab == 1 ? "active tab" : 'tab'} onClick={() => setactive_tab(1)}>
              Submission
            </div>
            */}
            {/* <div className={active_tab == 6 ? "active tab" : 'tab'} onClick={() => setactive_tab(6)}>
           very high weights
            </div> */}
            {/* <div className={active_tab == 7 ? "active tab" : 'tab'} onClick={() => setactive_tab(7)}>
            Team Submissions
            </div> */}
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
                //               customColumns={
                //                 [
                //     {
                //         title: 'Actions',
                //         render: (data) => (
                //           <div className='circular_loader_container  dark800'>
                //               <div 
                //               className={`circular_loader ${parseInt(data.percent_change.slice(0 , data.percent_change.indexOf("%"))) < 50 ? "green" : parseInt(data.percent_change.slice(0 , data.percent_change.indexOf("%"))) <= 75 ? "primary" : "error"}`} 
                //               style={{height:data.percent_change}}>  </div>
                //            </div>
                //         ),
                //       }
                   
                //   ]
                // }  
                            
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
