import React from "react";
import {useHistory} from "react-router";

function Missed(props) {
    let history = useHistory();
    return <div className="ui_notfound">
        <div>
            <h2>Ошибка 404.</h2>
            <h2>Страница не найдена</h2>
            <a href="#" onClick={(e) => {
                e.preventDefault();
                history.push("/");
            }}>Вернуться на главную</a>
        </div>
    </div>
}

export default Missed;