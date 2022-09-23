import { Button, message, Popconfirm, notification, Table, Tag } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function NewsDraft(props) {
    const user = JSON.parse(localStorage.getItem('token'))
    let [tableData, setTableData] = useState([])

    const axsTb = async () => {
        const res = await axios.get(`http://localhost:3004/news?author=${user.username}&auditState=0`)
        console.log(res);
        setTableData(res.data)
    }

    const confirm = (e, renderItem) => {
        let list = tableData.filter(item => item.id === renderItem.rightId)
        setTableData([...list])
        axios.delete(`http://localhost:3004/news/${renderItem.id}`)

        message.success('确定啊')
    }

    const cancel = (e, renderItem) => {
        message.error('不是啊')
    }

    const handleCheck = (id) => {
        axios.patch(`http://localhost:3004/news/${id}`, {
            auditState: 1
        })
        props.history.push('/audit-manage/list')
        notification.info({
            message: `成功`,
            description:
                `你可以到审核管理查看你的内容`,
            placement: 'bottomRight',
        });
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
            title: '分类',
            dataIndex: 'category',
            render: (value) => {
                return (
                    <Tag color='lime'>{value}</Tag>
                )
            }
        },
        {
            title: '操作',
            render: (renderItem) => {
                return (<>
                    <Popconfirm
                        title="你确定要删除吗?"
                        onConfirm={(e) => confirm(e, renderItem)}
                        onCancel={(e) => cancel(e, renderItem)}

                    >
                        <Button type="link" style={{ color: 'red' }}>删除</Button>
                    </Popconfirm>

                    <Button type="link" onClick={() => {
                        console.log(renderItem);
                        props.history.push(`/news-manage/update/${renderItem.id}`)
                    }}>编辑</Button>
                    <Button type="link" onClick={() => handleCheck(renderItem.id)}>上传</Button>

                </>
                )
            }
        }
    ]

    useEffect(() => {
        axsTb()
    }, [])

    return (
        <div>
            <Table dataSource={tableData} columns={columns}
                pagination={{ pageSize: 5 }} rowKey="id"
            ></Table>
        </div>
    )
}
