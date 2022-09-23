import React, { useState, useEffect } from "react"
import request from '@/utils/request'
import { notification } from "antd"

if (localStorage.getItem('token')) {
    var { username } = JSON.parse(localStorage.getItem('token'))
}

export default function usePublish(flag) {
    const [dataSource, setDataSource] = useState([])
    const getDataSource = async () => {
        let res = await request.get(`news?author=${username}&publishState=${flag}`)
        setDataSource(res.data)
    }

    const handlePublish = async (id) => {
        setDataSource(dataSource.filter(data => data.id !== id))
        await request.patch(`/news/${id}`, {
            publishState: 2,
            publishTime: Date.now()
        })
        notification.info({
            message: '通知',
            description: '你可以到发布管理中查看您的新闻',
            placement: 'bottomRight'
        })
    }

    const handleDelete = async (id) => {
        setDataSource(dataSource.filter(data => data.id !== id))
        await request.delete(`/news/${id}`)
        notification.info({
            message: '通知',
            description: '你的新闻已删除',
            placement: 'bottomRight'
        })
    }

    const handleSunset = async (id) => {
        setDataSource(dataSource.filter(data => data.id !== id))
        await request.patch(`/news/${id}`, {
            publishState: 3,
        })
        notification.info({
            message: '通知',
            description: '你可以到发布管理中查看您下线的新闻',
            placement: 'bottomRight'
        })
    }
    useEffect(() => {
        getDataSource()
    }, [])
    return {
        dataSource,
        handlePublish,
        handleDelete,
        handleSunset
    }
}
