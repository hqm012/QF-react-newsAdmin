
import React, { Component } from 'react'

import { Layout } from 'antd';

import SideMenu from '../../component/SideMenu'
import TopHeader from '../../component/TopHeader'
import ContentRouter from '../../router/contentRouter';

import nProgress from 'nprogress';
import 'nprogress/nprogress.css'

import './index.css'

const { Content } = Layout;

export default class News extends Component {

    render() {
        return (
            <Layout>
                <SideMenu></SideMenu>
                <Layout>
                    <TopHeader></TopHeader>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >

                        <ContentRouter></ContentRouter>
                    </Content>
                </Layout>
            </Layout>

        )
    }
}
