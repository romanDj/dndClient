import { combineReducers } from 'redux';
import { connectRouter  } from 'connected-react-router';
import common from "./reducers/common";

//здесь остальные редьюсеры можно добавлять

export default (history) => combineReducers({
    common,
    router: connectRouter(history)
});