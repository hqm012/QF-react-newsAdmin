import React, { useEffect, useState } from 'react'
import { Button, notification, Table, Tag } from 'antd'
import request from '@/utils/request'
import { Link } from 'react-router-dom'

export default function NewsPublish(props) {

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
        },
        {
            title: '新闻分类',
            dataIndex: 'categoryId',
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
                return props.button(renderItem.id)
            }
        }
    ]
    return (
        <Table dataSource={props.dataSource} columns={columns}
            pagination={{ pageSize: 5 }} rowKey="id"
        ></Table>
    )
}
