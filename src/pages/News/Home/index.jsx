import React from 'react'
import { Card, Col, Row, List, Icon, Avatar, Drawer } from 'antd';
import request from '@/utils/request'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import * as Echarts from 'echarts'

const { Meta } = Card;
const userData = JSON.parse(localStorage.getItem('token'));

export default function Home() {

    const [list1, setList1] = useState([])

    const getList1 = async () => {
        let res = await request('/news')
        setList1(res.data)
    }

    useEffect(() => {
        getList1()
    }, [])

    const barchar = useRef()
    useEffect(() => {

        var myChart = Echarts.init(barchar.current)
        myChart.setOption({
            title: {
                text: '新闻分类图示'
            },
            tooltip: {},
            legend: {
                data: ['数量']
            },
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                    name: '数量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        })
    }, [])

    const [drawerVisible, setDrawerVisible] = useState(false)

    const pieChart = useRef()

    const [myChart2, setMyChart2] = useState(null)
    const initPieChart = () => {
        let chart2;
        if (!myChart2) {
            chart2 = Echarts.init(pieChart.current)
            setMyChart2(chart2)
        } else {
            chart2 = myChart2
        }
        chart2.setOption({
            title: {
                text: 'Referer of a Website',
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        })

    }
    const handleClickSetting = () => {
        setTimeout(() => {
            setDrawerVisible(true)
            initPieChart()
        }, 0)
    }


    return (
        <div>
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="用户最常浏览" >
                        <List
                            // header={<div>Header</div>}
                            // footer={<div>Footer</div>}
                            dataSource={list1}
                            renderItem={item => (
                                <List.Item>
                                    <Link to={`/news-manage/preview/${item.id}`}>
                                        {item.title}
                                    </Link>

                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="用户点赞最多">
                        Card content
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        actions={[
                            <Icon type="setting" key="setting" onClick={handleClickSetting} />,
                            <Icon type="edit" key="edit" />,
                            <Icon type="ellipsis" key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={userData.username}
                            description={userData.role.roleName}
                        />
                    </Card>
                </Col>
            </Row>
            <div ref={barchar} style={{ width: '100%', height: '400px', margin: '20px 0' }}></div>
            <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                width="50%"
            >
                <div
                    ref={pieChart}
                    style={{
                        width: '100%',
                        height: '400px'
                    }}
                ></div>
            </Drawer>
        </div>
    )
}
