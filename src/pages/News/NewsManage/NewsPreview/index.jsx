import React, { useEffect, useState } from 'react'
import { PageHeader, Button, Descriptions } from 'antd';
import request from '@/utils/request'
import moment from 'moment';

export default function NewsPreview(props) {
    // console.log(props);
    useEffect(() => {
        getNewsInfo()
    }, [])

    const [newsInfo, setNewsInfo] = useState(null)
    const getNewsInfo = async () => {
        let res = await request(`news/${props.match.params.id}?_expand=role`)
        console.log(res);
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

    return (
        <div>
            {newsInfo && <><PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={newsInfo.title}
                subTitle={newsInfo.category}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">
                        {moment(newsInfo.createTime).format('YYYY-MM-DD HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="发布时间">{newsInfo.publishTime ? moment(newsInfo.publishTime).format('YYYY-MM-DD HH:mm:ss') : '-'}</Descriptions.Item>
                    <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                    <Descriptions.Item label="审核状态" >
                        <span style={{ color: colorList[newsInfo.auditState] }}>{auditStateJSX[newsInfo.auditState]}</span></Descriptions.Item>
                    <Descriptions.Item label="发布状态"><span style={{ color: colorList[newsInfo.auditState] }}>{publishState[newsInfo.publishState]}</span></Descriptions.Item>
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
