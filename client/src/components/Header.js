import React from 'react';
import {Icon, Menu} from 'antd';
import {store} from '../store';
import { push } from 'connected-react-router';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'main'
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({
            current: e.key,
        });
        store.dispatch(push('/'+ (e.key !== 'main' ? e.key : '') ));
    }

    render() {
        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="main">
                    <Icon type="mail"/>
                    <span>Главная</span>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Icon type="appstore"/>
                    <span>Личный кабинет</span>
                </Menu.Item>
                <Menu.Item key="alipay">
                    <Icon type="appstore"/>
                    <span>Войти</span>
                </Menu.Item>
                <Menu.Item key="spells">
                    <Icon type="appstore"/>
                    <span>Заклинания</span>
                </Menu.Item>
            </Menu>
        );
    }
}

export default Header;