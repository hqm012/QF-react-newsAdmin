import React, { useEffect, useState } from 'react'
import request from '@/utils/request'
import { Button, notification, Table } from 'antd'

if (localStorage.getItem('token')) {
    var { roleId, region, username } = JSON.parse(localStorage.getItem('token'))
}
const roleObj = {
    '1': 'superadmin',
    '2': 'admin',
    '3': 'editor'
}

export default function Audit() {
    const [dataSource, setDataSource] = useState([])

    const getTableList = async () => {
        let res = await request.get(`/news?audiState=1`)
        let list = res.data
        setDataSource(roleObj[roleId] === 'superadmin' ? list : [
            ...list.filter(item => item.author === username),
            ...list.filter(item => item.region === region && roleObj[item.roleId] === 'editor')
        ])
    }

    useEffect(() => {
        getTableList()
    }, [])

    const handlePass = async (item, auditState, publishState) => {
        setDataSource(dataSource.filter(data => data.id !== item.id))
        await request.patch(`/news/${item.id}`, {
            auditState,
            publishState
        })
        notification.info({
            message: '通知',
            description: '你可以到审核管理中查看你的新闻审核状态',
            placement: 'bottomRight'
        })
    }

    const handleReject = async (item, auditState, publishState) => {
        setDataSource(dataSource.filter(data => data.id !== item.id))
        await request.patch(`/news/${item.id}`, {
            auditState,
            publishState
        })
        notification.info({
            message: '通知',
            description: '你可以到审核管理中查看你的新闻审核状态',
            placement: 'bottomRight'
        })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '新闻标题',
            dataIndex: 'title',
        },
        {
            title: '作者',
            dataIndex: 'author',
        },
        {
            title: '新闻分类',
            dataIndex: 'category',
            render: (value) => value ? <>{value}</> : <>全球</>
        },
        {
            title: '操作',
            render: (renderItem) => {
                const colorList = ['', 'red', 'green', 'orange']
                return (
                    <>
                        <Button type='link' onClick={() => handlePass(renderItem, 2, 1)}>通过</Button>
                        <Button type='link' onClick={() => handleReject(renderItem, 3, 0)} style={{ color: 'red' }}>驳回</Button>
                    </>
                )
            }
        }
    ]

    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
            ></Table>
        </div>
    )
}
