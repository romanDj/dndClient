import "./styles/main.scss";
import React from "react";
import ReactDOM from "react-dom";

import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {history, store} from "./store/store";
import App from "./App";

/**
 * Входная точка, регистрация хранилища и роутера
 */
ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));