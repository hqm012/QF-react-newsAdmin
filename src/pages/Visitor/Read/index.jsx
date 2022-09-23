import React, { useEffect, useState } from 'react'
import { PageHeader, Icon, Descriptions, message } from 'antd';
import request from '@/utils/request'
import moment from 'moment';

export default function VisitorRead(props) {
    // console.log(props);
    useEffect(() => {
        getNewsInfo()
    }, [])

    const [newsInfo, setNewsInfo] = useState(null)
    const getNewsInfo = async () => {
        let res = await request(`news/${props.match.params.id}?_expand=role`)
        setNewsInfo(res.data)
    }

    // const auditStateJSX = (value) => {
    //     if (value === 0) {
    //         return <>草稿箱</>
    //     } else if (value === 1) {
    //         return <>审核中</>
    //     } else {
    //         return <>已发布</>
    //     }
    // }
    //优化方案：写成数组
    const auditStateJSX = ['未审核', '审核中', '已通过', '未通过']
    const publishState = ['未发布', '待发布', '已上线', '已下线']
    const colorList = ['black', 'orange', 'green', 'red']

    const clickLike = () => {
        message.success('叮~')
    }

    return (
        <div>
            {newsInfo && <><PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={newsInfo.title}
                subTitle={
                    <div>{newsInfo.category} <Icon onClick={clickLike} type="heart" theme="twoTone" twoToneColor="#eb2f96" /></div>
                }
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                    <Descriptions.Item label="发布时间">{newsInfo.publishTime ? moment(newsInfo.publishTime).format('YYYY-MM-DD HH:mm:ss') : '-'}</Descriptions.Item>
                    <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                    <Descriptions.Item label="访问数量">{newsInfo.view}</Descriptions.Item>
                    <Descriptions.Item label="点赞数量">{newsInfo.star}</Descriptions.Item>
                    <Descriptions.Item label="评论数量">88</Descriptions.Item>
                </Descriptions>
            </PageHeader>
                <div style={{ border: '1px solid #f8f8f8' }} dangerouslySetInnerHTML={{
                    __html: newsInfo.content
                }}></div></>}
        </div>
    )
}
