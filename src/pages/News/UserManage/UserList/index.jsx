import { Button, Switch, Table, Modal, } from 'antd';
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'

import UserFrom from './UserForm';

export default function UserList() {
    const [dataSource, setDataSource] = useState([])
    const [tableVisible, setTableVisible] = useState(false)
    const [region, setRegion] = useState([])
    const [roles, setRoles] = useState([])
    const [editvisible, setEditvisible] = useState(false)
    const [current, setCurrent] = useState({})
    const addForm = useRef(null)

    const { roleId, region: leizhen } = JSON.parse(localStorage.getItem('token'))
    const roleObj = {
        '1': 'superadmin',
        '2': 'admin',
        '3': 'editor'
    }

    const getUserList = async () => {
        let res = await axios.get('http://localhost:3004/users?_expand=role');
        let list = res.data
        setDataSource(roleObj[roleId] === 'superadmin' ? list : [
            ...list.filter(item => item.roleId >= roleId && item.region === leizhen),
        ])
        console.log(list);
    }
    const getRegion = async () => {
        let res = await axios.get('http://localhost:3004/regions')
        setRegion(res.data)
        console.log(res.data);
    }
    const getRoles = async () => {
        let res = await axios.get('http://localhost:3004/roles')
        setRoles(res.data)
        console.log(res.data);
    }

    const handleOk = () => {
        addForm.current.validateFields().then(
            formValue => {
                addForm.current.resetFields()
                setTableVisible(false)
                axios.post(`http://localhost:3004/users`, {
                    ...formValue,
                    roleState: true,
                    default: false,
                }).then(res => { console.log(res); getUserList() })
            }
        ).catch(
            err => console.log(err)
        )
    }

    const handleDelete = (listItem) => {
        console.log(listItem);
        let _dataSource = dataSource.filter(item => listItem.id !== item.id)
        setDataSource(_dataSource)
        axios.delete(`http://localhost:3004/users/${listItem.id}`)
    }

    const handleRoleStateChange = (item) => {
        item.roleState = !item.roleState
        setDataSource([...dataSource])
        axios.patch(`http://localhost:3004/users/${item.id}`, {
            roleState: item.roleState
        })
    }

    const handleEdit = async (item) => {
        setEditvisible(true)
        let res = await axios.get(`http://localhost:3004/users/${item.id}`)
        setCurrent(res.data)
        addForm.current.setFieldsValue(res.data)

    }

    const handleUpdata = () => {
        addForm.current.validateFields().then(formValue => {
            axios.patch(`http://localhost:3004/users/${current.id}`,
                formValue
            ).then(
                res => {
                    getUserList()
                    setEditvisible(false)
                }

            )
        }).catch(err => { })
    }

    useEffect(() => {
        getUserList()
        getRegion()
        getRoles()
    }, [])

    const columns = [
        {
            title: '用户名',
            dataIndex: 'role',
            render: (role) => <>{role.roleName}</>
        },
        {
            title: '角色名称',
            dataIndex: 'username'
        },
        {
            title: '区域',
            filters: [
                ...region.map(item => ({
                    text: item.title,
                    value: item.value,
                })),
                {
                    text: '全球',
                    value: '全球'
                }
            ],
            onFilter: (value, record) => { return value === "全球" ? record.region === "" : record.region.indexOf(value) === 0 },
            dataIndex: 'region',
            render: (region) => <>{region ? region : '全球'}</>,
        },
        {
            title: '用户状态',
            render: (item) => <Switch
                checked={item.roleState}
                disabled={item.default}
                onChange={() => handleRoleStateChange(item)}
            ></Switch>
        },
        {
            title: '操作',
            render: (item) => <>
                <Button type='link' disabled={item.default} onClick={
                    () => handleDelete(item)
                }>删除</Button>
                <Button type='link' disabled={item.default}
                    onClick={() => handleEdit(item)}
                >操作</Button>
            </>
        },
    ]


    return (
        <div>
            <Button type='primary' onClick={() => setTableVisible(true)}>添加权限</Button>
            <Table columns={columns} dataSource={dataSource} rowKey={'id'}></Table>
            <Modal
                visible={tableVisible}
                title="添加权限"
                // okText="Create"
                onCancel={() => setTableVisible(false)}
                onOk={handleOk}
            >
                <UserFrom region={region} roles={roles}
                    // wrappedComponentRef={addForm}
                    ref={addForm}
                ></UserFrom>
            </Modal>
            <Modal
                visible={editvisible}
                title="编辑用户"
                okText="更新"
                onCancel={() => setEditvisible(false)}
                onOk={handleUpdata}
            >
                <UserFrom region={region} roles={roles}
                    ref={addForm}
                ></UserFrom>
            </Modal>
        </div >
    )
}
