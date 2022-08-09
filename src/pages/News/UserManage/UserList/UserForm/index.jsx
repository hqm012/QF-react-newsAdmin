import { Form, Input, Select } from 'antd';

import React, { forwardRef, useState } from 'react'

const { Option } = Select

const UserFrom = forwardRef((props, ref) => {
    const [regionDisable, setRegionDisable] = useState(false)
    const formItemLayout = {
        // layout: 'inline',
        labelAlign: 'right',
        // labelCol: { span: 12 },
        // wrapperCol: { span: 20 }
    }

    const { getFieldDecorator, setFieldsValue } = props.form

    return (<Form
        {...formItemLayout}
    >
        <Form.Item label="用户名">
            {getFieldDecorator('username', {
                rules: [{ required: true, message: '用户名是必填项' }],
            })(<Input />)}
        </Form.Item>
        <Form.Item label="密码">
            {getFieldDecorator('password', {
                rules: [{ required: true, message: '密码是必填项!' }],
            })(<Input />)}
        </Form.Item>
        <Form.Item label="区域">
            {getFieldDecorator('region', {
                rules: regionDisable ? [] : [{ required: true }]
            })(<Select disabled={regionDisable}>
                {props.region.map(item => <Option value={item.value} key={item.id}>{item.title}</Option>)}
            </Select>)}
        </Form.Item>
        <Form.Item label="权限">
            {getFieldDecorator('roleId', {
                rules: [{ required: true }]
            })(<Select onChange={(value) => {
                if (value === 1) {
                    setRegionDisable(true)
                    setFieldsValue({ region: '' })
                } else {
                    setRegionDisable(false)
                }
            }}>
                {props.roles.map(item => <Option value={item.roleType} key={item.id}>{item.roleName}</Option>)}
            </Select>)}
        </Form.Item>
    </Form>

    )
})

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    UserFrom
)

export default CollectionCreateForm


