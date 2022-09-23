import React from 'react'
import NewsPublish from '../../../../component/NewsPublish'
import usePublish from '../hook/usePublish'
import { Button } from 'antd'


export default function Unpublished() {

    const { dataSource, handlePublish } = usePublish(1)

    return (
        <div>
            <NewsPublish dataSource={dataSource} button={(id) => <Button onClick={() => handlePublish(id)} type='primary'>发布</Button>}></NewsPublish>
        </div>
    )
}
