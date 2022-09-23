import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Layout, Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const { Sider } = Layout;

const { SubMenu } = Menu;

// 'appstore'
const iconObj = {
    "/home": 'appstore',
    "/user-manage": 'appstore',
    "/roll-manage": 'appstore',
    "/right-manage": 'appstore'
}

function SideMenu(props) {

    let [menuList, setMenuList] = useState([])

    const handleClick = e => {
        // console.log('click ', e);
    };

    const axsMenuList = async () => {
        const res = await axios.get('http://localhost:3004/rights?_embed=children')
        setMenuList(res.data)
    }

    const { role: { rights } } = JSON.parse(localStorage.getItem('token'))

    const checkPermission = (item) => {
        // console.log(rights.includes(item.key));
        return item.pagepermission === 1 && rights.includes(item.key)
    }

    const renderMenu = (target) => {
        return target.map((item) => {
            if (item.children?.length > 0 && checkPermission(item)) return (
                <SubMenu
                    key={item.key}
                    title={
                        <span>
                            <Icon type={iconObj[item.key] ? iconObj[item.key] : "appstore"} />
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {renderMenu(item.children)}
                </SubMenu>
            )
            return (
                checkPermission(item) && <Menu.Item key={item.key} onClick={() => {
                    // console.log(props);
                    props.history.push(item.key)
                }}>
                    {<Icon type={iconObj[item.key] ? iconObj[item.key] : "appstore"} />}
                    {item.title}
                </Menu.Item>
            )
        })
    }

    const selectKey = props.location.pathname
    const openKey = '/' + props.location.pathname.split('/')[1]
    // console.log(openKey);

    useEffect(() => {
        axsMenuList()
    }, [])

    const { collapsed } = props

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div style={{ height: '100%', display: 'flex', flexDirection: "column" }}>
                <div className="logo" style={{ color: '#fff', fontSize: 24, textAlign: 'center' }}>后台管理系统</div>
                <Menu
                    onClick={handleClick}
                    style={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}
                    // defaultSelectedKeys={selectKey}
                    selectedKeys={selectKey}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                >
                    {renderMenu(menuList)}
                </Menu>
            </div>


        </Sider>
    )
}

const mapStateToProps = (state) => {
    return {
        collapsed: state.collapsedReducer.collapsed
    }
}

export default connect(mapStateToProps)(withRouter(SideMenu))


