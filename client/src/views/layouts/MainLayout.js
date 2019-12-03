import React, {useState} from "react";
import Scrollbar from "react-scrollbars-custom";

import {Sidebar} from "../../components/Sidebar/Sidebar";
import {Navbar} from "../../components/Navbar/Navbar";

/**
 * MainLayout layout - шаблон с сайдбаром и навигационной панелью
 */
export default function MainLayout({children, ...rest}) {
    const [sideMenu, setSideMenu] = useState(window.innerWidth > 780);

    return <>
        <Navbar toggleSidebar={() => setSideMenu(!sideMenu)}/>
        <div className="ui_sidebar_content">
            <Sidebar status={sideMenu}
                     editStatus={()=>{
                         if(window.innerWidth <= 560){
                             setSideMenu(!sideMenu);
                         }
                     }}/>
            <div className="ui_content">
                <div className="ui_card">
                    <Scrollbar>
                        {children}
                    </Scrollbar>
                </div>
            </div>
        </div>
    </>
}