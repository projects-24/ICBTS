import React from 'react';
import SideContent from "funuicss/ui/sidebar/SideContent";
const MainContent = ({children}) => {
    return (
        <SideContent
            content={
                <div className={"padding-top-50"}>
                   <div className="padding-20">
                   {children}
                   </div>
                </div>
            }
        />
    );
}

export default  MainContent;