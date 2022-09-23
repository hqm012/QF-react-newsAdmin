import { Button, Form, PageHeader, Steps, Input, notification, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import request from '@/utils/request'
import Wysiwyg from '@/component/Wysiwyg'

const { Step } = Steps
const { Option } = Select

function NewsAdd(props) {
    const user = JSON.parse(localStorage.getItem('token'))
    console.log(user);
    const [current, setCurrent] = useState(0)
    const [categoryList, setCategoryList] = useState([])

    const getCategoryList = async () => {
        let res = await request('/categories')
        setCategoryList(res.data)
    }

    useEffect(() => {
        getCategoryList()
    }, [])

    const [formInfo, setFormInfo] = useState({})
    const handleNext = () => {
        // console.log(props.form);
        if (current === 0) {
            props.form.validateFields((err, values) => {
                if (!err) {
                    console.log(values);
                    setFormInfo(values)
                    setCurrent((c) => c + 1)
                }
            })
        } else {
            if (content && content.trim() !== '<p></p>') {
                setCurrent((c) => c + 1)
            } else {
                message.error('不能为空')
            }
        }

    }
    const handlePre = () => setCurrent((c) => c - 1)

    const [content, setContent] = useState('')
    const getContent = (value) => {
        console.log(value);
        setContent(value)
    }

    const handleSave = async (auditState) => {
        let res = await request.post('/news', {
            ...formInfo,
            content,
            region: user.region ? user.region : "全球",
            author: user.username,
            roleId: user.roleId,
            auditState,
            publishState: 0,
            createTime: Date.now(),
            star: 0,
            view: 0,
            // publishTime:0
        })
        console.log(res);
        props.history.push(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list')
        notification.info({
            message: `${auditState === 0 ? '保存' : '提交'}成功`,
            description:
                `你可以到${auditState === 0 ? '草稿箱' : '审核管理'}查看你的内容`,
            placement: 'bottomRight',
        });
    }

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
                            {categoryList.map(item => <Option
                                key={item.id}
                                value={item.value}
                            >{item.title}</Option>)}

                        </Select>)}
                    </Form.Item>

                </Form>
            </div>
            <div className={current === 1 ? style.active : style.hidden}>
                <Wysiwyg getContent={getContent}></Wysiwyg>
            </div>
            <div className={current === 2 ? style.active : style.hidden}>
                33333
            </div>

            {current > 0 && < Button onClick={handlePre}> 上一步</Button>}
            {current < 2 ? <Button type='primary' onClick={handleNext}>下一步</Button> : <>
                <Button onClick={() => handleSave(0)}>保存草稿</Button>
                <Button onClick={() => handleSave(1)}>提交审核</Button>
            </>}
        </div >
    )
}

const WrappedRegistrationForm = Form.create({ name: 'newsAdd' })(NewsAdd)
export default WrappedRegistrationForm
