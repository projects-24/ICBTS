import { PiBell, PiChartBar, PiGear, PiGridFour, PiChecks, PiList, PiSignOut, PiUser, PiX } from 'react-icons/pi';
import Text from 'funuicss/ui/text/Text'
import SideBar from "funuicss/ui/sidebar/SideBar";
import SideContent from 'funuicss/ui/sidebar/SideContent'

import List from 'funuicss/ui/list/List'
import ListItem from 'funuicss/ui/list/Item'
import Link from "next/link";
import RowFlex from "funuicss/ui/specials/RowFlex"
import Section from "funuicss/ui/specials/Section"
import Circle from "funuicss/ui/specials/Circle"
import Button from "funuicss/ui/button/Button"
import AppBar from "funuicss/ui/appbar/AppBar"
import { GetUser, SignOut } from '@/functions/Auth';
import { useEffect, useState } from 'react';


const Navigation = ({title , active}) => {
    const [user, setuser] = useState('')

    const mainSectionLinks = [
        {
            "route" : "/dashboard" ,
            "icon" : <PiChartBar /> ,
            "text" : "Dashboard" ,
            "isActive" : active == 1 ? true : false
        }
        ,
        {
            "route" : "/statistics" ,
            "icon" : <PiGridFour /> ,
            "text" : "Statistics" ,
            "isActive" : active == 2 ? true : false
        }
        ,
        {
            "route" : "/validation" ,
            "icon" : <PiChecks /> ,
            "text" : "Validation" ,
            "isActive" : active == 3 ? true : false
        }

    ]
    // const HelpSectionLinks = [
    //     {
    //         "route" : "/" ,
    //         "icon" : <PiGear /> ,
    //         "text" : "Settings" ,
    //     }
    //     ,
    //     {
    //         "route" : "/" ,
    //         "icon" : <PiSignOut /> ,
    //         "text" : "Logout" ,
    //     }

    // ]
    useEffect(() => {
      GetUser().then( res => setuser(res.user))
    }, [])
    
    return (
        <div>
            <AppBar
                left={<RowFlex gap={1}>
                    <img src="/gss.png" className='height-60' alt="" />
                    <img src="/logo.jpeg" className='height-60' alt="" />
                </RowFlex>}
                right={<Button text="SIGN OUT" endIcon={<PiSignOut />}  bg="error600" outlined rounded   onClick={SignOut}/>}
                sideBar
                fixedTop
                funcss={" z-index-10 height-80 card"}
                />
            <SideBar
                funcss="flat dark100 text-white"
                flat
                open={true}
                fixed
                header={
                    <div className="height-80">
                        <RowFlex gap={1} alignItems='center' justify='center' funcss='fit'>
                            <img src='Avatar.png' className='width-50' />
                            {
                                user && <>
                                <div>
                                <Text text={"Management"} uppercase size="small" />
                                <Text text={user.role} size="small" block />
                            </div>
                                </>
                            }
                        </RowFlex>
                    </div>
                }
                content={<div className="padding">
                    <Section gap={2}>
                        <List >

                            {
                                mainSectionLinks &&
                                mainSectionLinks.map(res => (
                                    <ListItem key={res.route}  >
                                        <Link href={res.route}>
                                            <RowFlex gap={0.5} funcss={` padding-5 roundEdgeSmall ${res.isActive ? "dark200" : ""}`}>
                                                <div className="width-30 height-30 central padding-5 roundEdgeSmall dark200 text-white">
                                                    {res.icon}
                                                </div>
                                                <Text
                                                    text={res.text}
                                                    color="white"
                                                    uppercase
                                                    size="small"
                                                />
                                            </RowFlex>
                                        </Link>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Section>
             
                </div>}

            />

        </div>
    )
}

export default Navigation