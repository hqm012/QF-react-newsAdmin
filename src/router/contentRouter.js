import { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import service from '../utils/request'

import React from 'react'
import Home from '../pages/News/Home'
import UserList from '../pages/News/UserManage/UserList'
import RoleList from '../pages/News/RightManage/Role/List'
import RightList from '../pages/News/RightManage/Right/LIst'
import NotPermission from '../pages/NotPermission'
import NewsAdd from '../pages/News/NewsManage/NewsAdd'
import NewsDraft from '../pages/News/NewsManage/NewsDraft'
import NewsPreview from '../pages/News/NewsManage/NewsPreview'
import NewsUpdate from '../pages/News/NewsManage/NewsUpdate'
import NewsCategory from '../pages/News/NewsManage/NewsCategory'
import Audit from '../pages/News/AuditManage/Audit'
import AuditList from '../pages/News/AuditManage/AuditList'
import Unpublished from '../pages/News/PublishManage/Unbpublished'
import Published from '../pages/News/PublishManage/Published'
import Sunset from '../pages/News/PublishManage/Sunset'
import { Spin } from 'antd'
import { connect } from 'react-redux'

const localRouterMap = {
    "/home": Home,
    "/user-manage/list": UserList,
    "/right-manage/role/list": RoleList,
    "/right-manage/right/list": RightList,
    "/news-manage/add": NewsAdd,
    "/news-manage/draft": NewsDraft,
    "/news-manage/preview/:id": NewsPreview,
    "/news-manage/update/:id": NewsUpdate,
    "/news-manage/category": NewsCategory,
    "/audit-manage/audit": Audit,
    "/audit-manage/list": AuditList,
    "/publish-manage/unpublished": Unpublished,
    "/publish-manage/published": Published,
    "/publish-manage/sunset": Sunset,
}

function ContentRouter(props) {
    const { loading } = props
    const [backRouteList, setBackRouteList] = useState([])

    useEffect(() => {
        const asy = async () => {
            let res1 = await service.get('http://localhost:3004/rights')
            let res2 = await service.get('http://localhost:3004/children')
            // console.log(res1, res2);
            setBackRouteList([res1.data[0], ...res2.data])
        }
        asy()
    }, [])

    const checkRoute = (item) => {
        // console.log(item);
        return localRouterMap[item.key] && (item.pagepermission || item.routepermission)
    }

    const checkPermission = (item) => {
        // console.log(item);
        return JSON.parse(localStorage.getItem('token')).role.rights.includes(item?.key)
    }

    return (
        <Spin spinning={loading}>
            <Switch>
                {/* <Route path="/home" component={Home}></Route>
            <Route path="/user-manage/list" component={UserList}></Route>
            <Route path="/right-manage/role/list" component={RoleList}></Route>
            <Route path="/right-manage/right/list" component={RightList}></Route> */}
                {backRouteList.map(item => {
                    if (checkRoute(item) && checkPermission(item)) {
                        return <Route key={item.key} path={item.key} component={localRouterMap[item.key]}></Route>
                    } else {
                        return null
                    }
                })}


                <Redirect from='/' to="/home" exact></Redirect>
                {backRouteList.length && <Route path="*" component={NotPermission}></Route>}
            </Switch>
        </Spin>
    )
}

const mapStateToProps = (state) => ({
    loading: state.loadingReducer.loading
})

export default connect(mapStateToProps)(ContentRouter)