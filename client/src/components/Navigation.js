import React, {useState} from "react";
import logo from "../statics/images/icon_ico.png";


import {AiOutlineMenu} from "react-icons/ai";
import {IconContext} from "react-icons";
import {FaEllipsisV} from "react-icons/fa";

import {routes} from "../routes";
import {useHistory, useRouteMatch} from "react-router";

import Dropdown from "./Dropdown";

/**
 * Логика навигации приложения
 */
function Navigation(props) {
    const [sideMenu, setSideMenu] = useState(window.innerWidth > 780);

    return <>
        <div className="ui_navbar">
            <div className="ui_navbar_item" onClick={() => setSideMenu(!sideMenu)}>
                <IconContext.Provider value={{style: {verticalAlign: 'middle'}}}>
                    <AiOutlineMenu/>
                </IconContext.Provider>
            </div>
            <div className="bs_label">
                <img src={logo} alt="Logo" className="bs_icon"/>
                <p>Bs client</p>
            </div>

            <Dropdown Overlay={ProfileMenu} Style="ui_navbar_item">
                <FaEllipsisV/>
            </Dropdown>
        </div>

        <div className="ui_sidebar_content">
            <div className={sideMenu ? "ui_sidebar" : "ui_sidebar ui_sidebar-close"}>
                {routes.map((route, index) =>
                    <NavigationSidebarItem
                        key={index}
                        route={route}/>)}
            </div>

            <div className="ui_content">
                {props.children}
            </div>
        </div>
    </>
}

function NavigationSidebarItem({route}) {
    let match = useRouteMatch({
        path: route.path,
        exact: route.exact
    });
    let history = useHistory();

    return <div className={match ? "ui_sidebar_item ui_sidebar_item-select" : "ui_sidebar_item"}
                onClick={() => history.push(route.path)}>
        <IconContext.Provider value={{style: {fontSize: '25px', marginRight: '6px'}}}>
            {route.sidebar.icon}
        </IconContext.Provider>
        <p>{route.sidebar.label}</p>
    </div>;
}

const ProfileMenu = () => {
    let profileItems = [
        {key: "page1", content: "Профиль", callback: () => console.log("собственное действие")},
        {key: "page10", content: "Персонажи"},
        {key: "page3", content: "Войти"},
        {key: "page4", content: "Выйти"}
    ];

    return <div className="ui_submenu">
        {profileItems.map((item, index) =>
            <div key={index}
                 className="ui_submenu_item">
                <p>{item.content}</p>
            </div>
        )}
    </div>;
};

export default Navigation;