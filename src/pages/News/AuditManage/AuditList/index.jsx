import React, { useEffect, useState } from 'react'
import { Button, notification, Table, Tag } from 'antd'
import request from '@/utils/request'
import { Link } from 'react-router-dom'

if (localStorage.getItem('token')) {
    var { roleId, region, username } = JSON.parse(localStorage.getItem('token'))
}
export default function AuditList(props) {
    const [tableData, setTableData] = useState([])
    const getAuditList = async () => {
        let res = await request(`/news?author=${username}&auditState_ne=0&publishState_lte=1`)
        setTableData(res.data)
    }
    useEffect(() => {
        getAuditList()
    }, [])

    const handleRevert = async (item) => {
        setTableData(tableData.filter(data => data.id !== item.id))

        notification.info({
            message: '通知',
            description: '你可以到草稿箱中查看撤销审核的新闻',
            placement: 'bottomRight'
        })
    }

    const handleUpdate = (item) => {
        props.history.push(`/news-manage/update/${item.id}`)
    }

    const handlePublish = async (item) => {
        await request.patch(`/news/${item.id}`, {
            publishState: 2,
            publishTime: Date.now()
        })
        props.history.push('/publish-manage/published')
        notification.info({
            message: '通知',
            description: '你可以到发布管理中查看发布的新闻',
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
            render: (value, row) => <Link to={`/news-manage/preview/${row.id}`}>{value}</Link>
        },
        {
            title: '作者',
            dataIndex: 'author',
            render: (value) => {
                return (
                    <Tag color='lime'>{value}</Tag>
                )
            }
        },
        {
            title: '新闻分类',
            dataIndex: 'category',
            render: (value) => {
                return (
                    <Tag color='lime'>{value}</Tag>
                )
            }
        },
        {
            title: '审核状态',
            dataIndex: 'auditState',
            render: (value) => {
                const colorList = ['pink', 'orange', 'green', 'red']
                const auditList = ['草稿箱', '审核中', '已通过', '未通过']
                return (
                    <Tag color={colorList[value]}>{auditList[value]}</Tag>
                )
            }
        },
        {
            title: '操作',
            render: (renderItem) => {
                const colorList = ['', 'red', 'green', 'orange']
                return (
                    <>

                        {renderItem.auditState === 1 &&
                            <Button type="link" style={{ color: colorList[renderItem.auditState] }} onClick={() => handleRevert(renderItem)}>撤销</Button>}
                        {renderItem.auditState === 2 &&
                            <Button type="link" style={{ color: colorList[renderItem.auditState] }} onClick={() => handlePublish(renderItem)}>发布</Button>}
                        {renderItem.auditState === 3 &&
                            <Button type="link" style={{ color: colorList[renderItem.auditState] }} onClick={() => handleUpdate(renderItem)}>更新</Button>}
                    </>
                )
            }
        }
    ]
    return (
        <Table dataSource={tableData} columns={columns}
            pagination={{ pageSize: 5 }} rowKey="id"
        ></Table>
    )
}
