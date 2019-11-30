import React from "react";
//иконки
import {GiDragonHead, GiPointyHat, GiSpellBook, GiSwordman, GiThreeFriends} from "react-icons/gi";
import {TiHome} from "react-icons/ti";

//страницы
const Home = React.lazy(() => import("./layouts/Home"));
const Spells = React.lazy(() => import("./layouts/Spells"));
const Bestiary = React.lazy(() => import("./layouts/Bestiary"));
const MagicItems = React.lazy(() => import("./layouts/MagicItems"));
const CharacterCreation = React.lazy(() => import("./layouts/СharacterCreation"));
const CharacterGallery = React.lazy(() => import("./layouts/СharacterGallery"));

//роутинг
export const routes = [
    {
        path: "/",
        exact: true,
        sidebar: {
            label: "Главная",
            icon: (<TiHome/>)
        },
        main: () => <Home/>
    },
    {
        path: "/spells",
        sidebar: {
            label: "Заклинания",
            icon: (<GiSpellBook/>)
        },
        main: () => <Spells/>
    },
    {
        path: "/bestiary",
        sidebar: {
            label: "Бестиарий",
            icon: (<GiDragonHead/>)
        },
        main: () => <Bestiary/>
    },
    {
        path: "/magicitems",
        sidebar: {
            label: "Магические предметы",
            icon: (<GiPointyHat/>)
        },
        main: () => <MagicItems/>
    },
    {
        path: "/charactercreation",
        exact: true,
        sidebar: {
            label: "Создать персонажа",
            icon: (<GiSwordman/>)
        },
        main: () => <CharacterCreation/>
    },
    {
        path: "/charactergallery",
        exact: true,
        sidebar: {
            label: "Галлерея персонажей",
            icon: (<GiThreeFriends/>)
        },
        main: () => <CharacterGallery/>
    }
];
