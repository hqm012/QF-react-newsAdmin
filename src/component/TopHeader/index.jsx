import React, { useState } from 'react'

import { Layout, Icon, Menu, Dropdown, Avatar, Button } from 'antd';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const { Header } = Layout;



function TopHeader(props) {
    // const [collapsed, setCollasped] = useState(false)
    const { collapsed, changeCollapsed } = props
    const { username, role: { roleName } } = JSON.parse(localStorage.getItem('token'))
    const menu = (
        <Menu>
            <Menu.Item>
                <Button type='link'>{roleName}</Button>
            </Menu.Item>
            <Menu.Item>
                <Button type='link' style={{ color: 'red' }}
                    onClick={() => {
                        localStorage.removeItem('token');
                        // console.log(props);
                        props.history.push('/login')
                    }}
                >退出</Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <Header style={{
            background: '#fff', padding: '0 24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
            <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={() => { changeCollapsed() }}
            />
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    欢迎回来，{username} <Avatar size="large" icon="user" /> <Icon type="down" />
                </a>
            </Dropdown>


        </Header>
    )
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        collapsed: state.collapsedReducer.collapsed
    }
}

const mapDispatchToProps = {
    changeCollapsed() {
        return { type: 'changeCollapsed' }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopHeader)) 
