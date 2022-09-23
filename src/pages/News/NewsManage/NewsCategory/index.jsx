import React, { useEffect, useState } from 'react'
import request from '@/utils/request'
import { Button, message, notification, Table } from 'antd'
import { Input, Popconfirm, Form } from 'antd';
import axios from 'axios';

const roleObj = {
    '1': 'superadmin',
    '2': 'admin',
    '3': 'editor'
}

export default function NewsAudit() {
    const [dataSource, setDataSource] = useState([])

    const getTableList = async () => {
        let res = await request.get(`/categories`)
        let list = res.data
        setDataSource(list)
    }

    useEffect(() => {
        getTableList()
    }, [])

    const handleDele = async (renderItem) => {
        setDataSource(dataSource.filter(data => data.id !== renderItem.id))
        // await request.delete(`categories/${renderItem.id}`)
        message.info('没写新增，所以不给删除，刷新后恢复')
    }

    const handleSave = row => {
        const newData = [...dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData)
        request.patch(`/categories/${row.id}`, {
            title: row.title,
            value: row.title
        })
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '栏目名称',
            dataIndex: 'title',
            onCell: record => ({
                record,
                editable: true,
                dataIndex: 'title',
                title: '栏目名称',
                handleSave: handleSave,
            }),
        },

        {
            title: '操作',
            render: (renderItem) => {
                return (
                    <Button type='danger' onClick={() => handleDele(renderItem)}>删除</Button>
                )
            }
        }
    ]

    const EditableContext = React.createContext();
    const EditableRow = ({ form, index, ...props }) => (
        <EditableContext.Provider value={form}>
            <tr {...props} />
        </EditableContext.Provider>
    );
    const EditableFormRow = Form.create()(EditableRow);
    class EditableCell extends React.Component {
        state = {
            editing: false,
        };

        toggleEdit = () => {
            const editing = !this.state.editing;
            this.setState({ editing }, () => {
                if (editing) {
                    this.input.focus();
                }
            });
        };

        save = e => {
            const { record, handleSave } = this.props;
            this.form.validateFields((error, values) => {
                if (error && error[e.currentTarget.id]) {
                    return;
                }
                this.toggleEdit();
                handleSave({ ...record, ...values });
            });
        };

        renderCell = form => {
            this.form = form;
            const { children, dataIndex, record, title } = this.props;
            const { editing } = this.state;
            return editing ? (
                <Form.Item style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                        rules: [
                            {
                                required: true,
                                message: `${title} is required.`,
                            },
                        ],
                        initialValue: record[dataIndex],
                    })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
                </Form.Item>
            ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                >
                    {children}
                </div>
            );
        };

        render() {
            const {
                editable,
                dataIndex,
                title,
                record,
                index,
                handleSave,
                children,
                ...restProps
            } = this.props;
            return (
                <td {...restProps}>
                    {editable ? (
                        <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                    ) : (
                        children
                    )}
                </td>
            );
        }
    }

    const components = {
        body: {
            row: EditableFormRow,
            cell: EditableCell,
        },
    };

    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={item => item.id}
                components={components}
            ></Table>
        </div>
    )
}
