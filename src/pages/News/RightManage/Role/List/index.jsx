import { Button, Modal, Popconfirm, Table, Tree } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function RoleList() {
    let [dataSource, setDataSource] = useState([])
    let [treeList, setTreeList] = useState([])
    let [treeCurrentKey, setTreeCurrentKey] = useState([])
    let [treeCurrentId, setTreeCurrentId] = useState(0)
    let [modalVisible, setModalVisible] = useState(false)

    const getTableList = async () => {
        let res = await axios.get('http://localhost:3004/roles')
        setDataSource(res.data)
        // console.log(res.data);
    }
    const getTreeList = async () => {
        let res = await axios.get('http://localhost:3004/rights?_embed=children')
        setTreeList(res.data)
    }

    const handleConfirm = (renderItem) => {
        setDataSource(dataSource.filter(item => item.id !== renderItem.id))
        // axios.delete(`http://localhost:3004/roles/${renderItem.id}`)
    }

    const handleCancel = () => {
        // console.log('行吧');
    }

    const handleOk = () => {
        setModalVisible(false);
        let newDataSource = dataSource.map(item => {
            if (item.id === treeCurrentId) {
                return {
                    ...item,
                    rights: treeCurrentKey
                }
            }
            return item
        })
        setDataSource(newDataSource)
        axios.patch(`http://localhost:3004/roles/${treeCurrentId}`, {
            rights: treeCurrentKey
        })
    }

    const handleTreeCheck = (keys) => {
        // console.log(keys);
        setTreeCurrentKey(keys.checked)
    }


    useEffect(() => {
        getTableList()
        getTreeList()
    }, [])


    const columns = [
        { title: 'ID', dataIndex: 'id' },
        { title: '角色名称', dataIndex: 'roleName' },
        {
            title: '操作', render: (renderItem) => <>
                <Popconfirm
                    title="你确定要删除吗?"
                    onConfirm={() => handleConfirm(renderItem)}
                    onCancel={handleCancel}
                >

                    <Button type='link' style={{ color: 'red' }} onClick={() => { console.log(); }}>删除</Button>
                </Popconfirm>
                <Button type='link' onClick={() => {
                    setTreeCurrentKey(renderItem.rights);
                    setTreeCurrentId(renderItem.id)
                    setModalVisible(true);

                }}>编辑</Button>
            </>
        }

    ]

    return (
        <div>
            <Table columns={columns} dataSource={dataSource} rowKey="id"></Table>
            <Modal title="权限管理" visible={modalVisible} onCancel={() => setModalVisible(false)} onOk={handleOk}>
                <Tree checkable checkStrictly treeData={treeList} checkedKeys={treeCurrentKey} onCheck={handleTreeCheck}>
                </Tree>
            </Modal>
        </div>
    )
}
