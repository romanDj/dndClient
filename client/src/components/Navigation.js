import React, {useState} from "react";
import logo from "../statics/images/icon_ico.png";


//верхняя навигационная панель
function Navigation(props) {
    const [profileMenu, setProfileMenu] = useState(false);
    const [sideMenu, setSideMenu] = useState(window.innerWidth > 560);

    //hooks, выбор вкладки, хранить текущую вкладку, и передавать соответствующй набор стилей
    let navbarItems = [
        {key: "page1", content: "Профиль", callback: () => console.log("собственное действие")},
        {key: "page10", content: "Персонажи"},
        {key: "page3", content: "Войти"},
        {key: "page4", content: "Выйти"}
    ];

    let sideItems = [
        {key: "page1", content: "Главная", callback: () => console.log("собственное действие"), select: true},
        {key: "page2", content: "Заклинания"},
        {key: "page6", content: "Магические предметы"},
        {key: "page3", content: "Бестиарий"},
        {key: "page100", content: "Создать персонажа"},
    ];

    return <>
        <div className="ui_navbar" onClick={() => (profileMenu === true && setProfileMenu(false))}>
            <div className="ui_navbar_item" onClick={() => setSideMenu(!sideMenu)}>
                <i className="fas fa-bars"></i>
            </div>
            <div className="bs_label">
                <img src={logo} alt="Logo" className="bs_icon"/>
                <p>Bs client</p>
            </div>
            <div className="ui_navbar_item">
                <i className="fas fa-ellipsis-v" onClick={() => setProfileMenu(!profileMenu)}></i>
                <div className={profileMenu ? "ui_submenu-open" : "ui_submenu-close"}
                     onClick={() => setProfileMenu(false)}>
                    {ListItems(navbarItems, "ui_navbar_submenu_item")}
                </div>
            </div>
        </div>

        <div className="ui_sidebar_content" onClick={() => (profileMenu === true && setProfileMenu(false))}>
            <div className={ sideMenu ? "ui_sidebar" : "ui_sidebar ui_sidebar-close" }>
                {ListItems(sideItems, "ui_sidebar_item", "ui_sidebar_item-select")}
            </div>

            <div className="ui_content">
                    {props.children}
            </div>
        </div>

    </>
}

function ListItems(items, classStyle, selectStyle = "") {
    let callback = (route) => {
        console.log("Перенаправить -> " + route);
    };
    //здесь надо будет получить dispatch для роутинга
    return items.map(item => <div key={item.key}
                                  className={classStyle + (item.select ? (" " + selectStyle) : "")}
                                  onClick={() => (item.callback ? item.callback() : callback(item.key))}>
        {item.content}</div>);
}

export default Navigation;