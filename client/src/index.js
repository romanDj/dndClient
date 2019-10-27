import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import {ConnectedRouter} from 'connected-react-router';
import {Route, Switch} from 'react-router';
import { store, history} from './store';
import App from './components/App';
//стили
import './index.css';
import 'antd/dist/antd.css';

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App}/>
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));

