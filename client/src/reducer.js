import { combineReducers } from 'redux';
import { connectRouter  } from 'connected-react-router';

//здесь остальные редьюсеры можно добавлять

export default (history) => combineReducers({
    router: connectRouter(history)
});