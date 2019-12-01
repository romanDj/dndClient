import React from "react";
import "./Navbar.scss";

import {AiOutlineMenu} from "react-icons/ai";
import {FaEllipsisV} from "react-icons/fa";

import {IconContext} from "react-icons";
import logo from "../../statics/images/icon_ico.png";
import Dropdown from "../Dropdown/Dropdown";


function Navbar({toggleSidebar}) {
    return <div className="ui_navbar">
        <div className="ui_navbar_item" onClick={toggleSidebar}>
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

export {Navbar}