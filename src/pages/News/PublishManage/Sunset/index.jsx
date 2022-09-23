import React from 'react'
import NewsPublish from '../../../../component/NewsPublish'
import usePublish from '../hook/usePublish'
import { Button } from 'antd'

export default function Sunset() {

    const { dataSource, handleDelete } = usePublish(3)

    return (
        <div>
            <NewsPublish dataSource={dataSource} button={(id) => <Button onClick={() => handleDelete(id)} type='danger'>删除</Button>}></NewsPublish>
        </div>
    )
}