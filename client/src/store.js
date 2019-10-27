import {applyMiddleware, compose, createStore} from 'redux';
import {localStorageMiddleware, promiseMiddleware} from './middleware';
import reducer from './reducer';

import {routerMiddleware} from 'connected-react-router'
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();

export const store = createStore(
    reducer(history),
    compose(
        applyMiddleware(
            routerMiddleware(history),
            promiseMiddleware,
            localStorageMiddleware
        )
    )
);