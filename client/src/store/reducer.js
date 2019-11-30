import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

//регистрация редьюсеров
export default (history) => combineReducers({
    router: connectRouter(history)
});