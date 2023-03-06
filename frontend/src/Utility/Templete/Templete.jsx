/* eslint-disable no-undef */
import React, { useState } from 'react'
import Tolbar from "../../scenes/global/Tolbar";
import Sidebar from "../../scenes/global/Sidebar";
const Template = ({children}) => {
  const hh ={ position:"relative",}
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <>
      <div className="app" style={hh}>
        <Sidebar isSidebar={isSidebar} />
        <div className="content">
          <Tolbar setIsSidebar={setIsSidebar} />
            <div className="--pad" style={{minHeight:"80vh"}}>

                {children}

            </div>
          
           
        </div>
      </div>

    </>
  )
}

export default Template