import { Button, message, Popconfirm, Popover, Switch, Table, Tag } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function RightList() {
    let [tableData, setTableData] = useState([])

    const axsTb = async () => {
        const res = await axios.get('http://localhost:3004/rights?_embed=children')
        setTableData(res.data)
    }

    const confirm = (e, renderItem) => {
        if (renderItem.grade == 1) {
            setTableData(tableData.filter(item => item.id != renderItem.id))
            // axios.delete(`http://localhost:3004/rights/${renderItem.id}`)
        } else {
            let list = tableData.filter(item => item.id === renderItem.rightId)
            list[0].children = list[0].children.filter(item => item.id != renderItem.id)
            setTableData([...tableData])
            // axios.delete(`http://localhost:3004/children/${renderItem.id}`)
        }

        message.success('确定啊')
    }

    const cancel = (e, renderItem) => {
        message.error('不是啊')
    }

    const switchChange = (value, renderItem) => {
        renderItem.pagepermission = Number(value)
        setTableData([...tableData])
        if (renderItem.grade === 1) {
            axios.patch(`http://localhost:3004/rights/${renderItem.id}`, {
                pagepermission: renderItem.pagepermission
            })
        } else {
            axios.patch(`http://localhost:3004/chidren/${renderItem.id}`, {
                pagepermission: renderItem.pagepermission
            })
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '项名',
            dataIndex: 'title',
        },
        {
            title: '路径',
            dataIndex: 'key',
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

                    <Popover title="页面配置项" trigger={renderItem.pagepermission?.toString() ? 'click' : ''} content={
                        <>
                            <Switch checked={Boolean(renderItem.pagepermission)} onChange={(checkValue) => switchChange(checkValue, renderItem)}></Switch>
                        </>
                    }>
                        <Button type="link" disabled={!renderItem.pagepermission?.toString()} >编辑</Button>
                    </Popover>
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
                pagination={{ pageSize: 5 }}
            ></Table>
        </div>
    )
}
