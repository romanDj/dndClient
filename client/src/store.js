import {applyMiddleware, compose, createStore} from 'redux';
import {localStorageMiddleware, promiseMiddleware} from './middleware';
import reducer from './reducer';

import {routerMiddleware} from 'connected-react-router'
import {createBrowserHistory} from 'history';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();

export const store = createStore(
    reducer(history),
    compose(
        applyMiddleware(
            thunk,
            routerMiddleware(history),
            promiseMiddleware,
            localStorageMiddleware
        )
    )
);