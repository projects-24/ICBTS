import React from 'react';
import SideContent from "funuicss/ui/sidebar/SideContent";
const MainContent = ({children}) => {
    return (
        <SideContent
            content={
                <div className={"padding-top-60 padding-bottom-60"}>
                   <div className="padding-50">
                   {children}
                   </div>
                </div>
            }
        />
    );
}

export default  MainContent;