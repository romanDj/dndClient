import React from 'react';
import {Icon} from 'antd';
import Header from './Header';
import {connect} from 'react-redux';
import { Route, Switch } from 'react-router';
import {store} from '../store';
import {push} from 'connected-react-router';
import {APP_LOAD, REDIRECT} from '../constants/actionTypes';
import Home from './Home';
import Profile from './Profile';
import Spells from "./Spells";

const mapStateToProps = state => {
    return {
        appLoaded: state.common.appLoaded,
        appName: state.common.appName,
        currentUser: state.common.currentUser,
        redirectTo: state.common.redirectTo
    }
};

//createActions
const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
        dispatch({type: APP_LOAD, payload, token, skipTracking: true}),
    onRedirect: () =>
        dispatch({type: REDIRECT})
});

class App extends React.Component {
    //вызывается при обновлении props
    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            store.dispatch(push(nextProps.redirectTo));
            this.props.onRedirect();
        }
    }

    //перед рендерингом компонента
    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        if (token) {
            //agent.setToken(token);
        }

        //this.props.onLoad(token ? agent.Auth.current() : null, token);
    }

    render() {
        return (
            <div>
                <Header
                    appName={this.props.appName}
                    currentUser={this.props.currentUser}
                />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/profile" component={Profile} />
                    <Route path="/spells" component={Spells} />
                    <Route render={() => (<div>Not found</div>)} />
                </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
