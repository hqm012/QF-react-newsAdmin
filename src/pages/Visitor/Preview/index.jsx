import React from 'react'
import { useEffect, useState } from 'react'
import { PageHeader, Card, Col, Row, Button } from 'antd';
import request from '@/utils/request'
import { withRouter } from 'react-router-dom';

function VisitorPreview(props) {

    const [publishNews, setPublishNews] = useState([])

    const getPublishNews = async () => {
        const res = await request('/news')
        setPublishNews(res.data)
    }

    useEffect(() => {
        getPublishNews()
    }, [])

    const toRead = (id) => {
        props.history.push(`/read/${id}`)
    }

    return (
        <div>
            <PageHeader
                style={{
                    border: '1px solid rgb(235, 237, 240)',
                }}
                onBack={() => null}
                title="全球新闻系统"
                subTitle="遨游新闻的海洋"
            />
            <Row gutter={[16, 16]} style={{ width: '90%', margin: '20px auto' }}>
                {publishNews.map(item => {
                    return <Col span={8} key={item.id}>
                        <Card title={item.title} hoverable
                            extra={<span onClick={() => toRead(item.id)} style={{ color: '#2db7f5' }}>查看详情</span>}
                        >
                            <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                        </Card>
                    </Col>
                })}

            </Row>
        </div >
    )
}

export default withRouter(VisitorPreview)
