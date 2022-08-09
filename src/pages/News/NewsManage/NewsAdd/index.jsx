import { Button, Form, PageHeader, Steps, Input, Row, Select } from 'antd'
import React, { useState } from 'react'
import style from './index.module.scss'
import request from '/utils/request'
console.log(request);

const { Step } = Steps
const { Option } = Select

function NewsAdd(props) {
    const [current, setCurrent] = useState(0)

    const handleNext = () => setCurrent((c) => c + 1)
    const handlePre = () => setCurrent((c) => c - 1)
    console.log(props);
    const { getFieldDecorator } = props.form
    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    }

    return (
        <div>
            <PageHeader
                title="撰写新闻"
                subTitle="编写新发现"
            />
            <Steps current={current} className={style['ant-steps']}>
                <Step title="基本信息" description="新闻标题，新闻分类" />
                <Step title="新闻内容" description="新闻主体内容" />
                <Step title="新闻提交" description="保存草稿或者提交审核" />
            </Steps>

            <div className={`${style['first-form']} ${current === 0 ? style.active : style.hidden}`}>
                <Form {...formItemLayout}>
                    <Form.Item label="新闻标题">
                        {getFieldDecorator('title', {
                            rules: [
                                { required: true }
                            ]
                        })(<Input />)}
                    </Form.Item>

                    <Form.Item label="新闻分类">
                        {getFieldDecorator('category', {
                            rules: [
                                { required: true }
                            ]
                        })(<Select>
                            <Option value={111}>111</Option>
                        </Select>)}
                    </Form.Item>

                </Form>
            </div>
            <div className={current === 1 ? style.active : style.hidden}>
                22222
            </div>
            <div className={current === 2 ? style.active : style.hidden}>
                33333
            </div>

            {current > 0 && < Button onClick={handlePre}> 上一步</Button>}
            {current < 2 ? <Button type='primary' onClick={handleNext}>下一步</Button> : <>
                <Button>保存草稿</Button>
                <Button>提交审核</Button>
            </>}
        </div >
    )
}

const WrappedRegistrationForm = Form.create({ name: 'newsAdd' })(NewsAdd)
export default WrappedRegistrationForm
