import React from "react";
import "./Sidebar.scss";

import {GiDragonHead, GiPointyHat, GiSpellBook, GiSwordman, GiThreeFriends} from "react-icons/gi";
import {TiHome} from "react-icons/ti";
import {useHistory, useRouteMatch} from "react-router";
import {IconContext} from "react-icons";

const items = [
    {
        path: "/",
        exact: true,
        label: "Главная",
        icon: <TiHome/>
    },
    {
        path: "/spells",
        label: "Заклинания",
        icon: <GiSpellBook/>
    },
    {
        path: "/bestiary",
        label: "Бестиарий",
        icon: <GiDragonHead/>
    },
    {
        path: "/magicitems",
        label: "Магические предметы",
        icon: <GiPointyHat/>
    },
    {
        path: "/charactercreation",
        exact: true,
        label: "Создать персонажа",
        icon: <GiSwordman/>
    },
    {
        path: "/charactergallery",
        exact: true,
        label: "Галлерея персонажей",
        icon: (<GiThreeFriends/>)
    }
];

function Sidebar({status}) {
    return <div className={status ? "ui_sidebar" : "ui_sidebar ui_sidebar-close"}>
        {items.map((item, index) => <SidebarItem key={index} route={item}/>)}
    </div>
}

function SidebarItem({route}) {
    let match = useRouteMatch({
        path: route.path,
        exact: route.exact
    });
    let history = useHistory();

    return <div className={match ? "ui_sidebar_item ui_sidebar_item-select" : "ui_sidebar_item"}
                onClick={() => history.push(route.path)}>
        <IconContext.Provider value={{style: {fontSize: '25px', marginRight: '6px'}}}>
            {route.icon}
        </IconContext.Provider>
        <p>{route.label}</p>
    </div>;
}

export {Sidebar}