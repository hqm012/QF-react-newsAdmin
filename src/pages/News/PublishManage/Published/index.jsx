import { Button } from 'antd'
import React from 'react'
import NewsPublish from '../../../../component/NewsPublish'
import usePublish from '../hook/usePublish'

export default function Published() {

    const { dataSource, handleSunset } = usePublish(2)

    return (
        <div>
            <NewsPublish dataSource={dataSource} button={(id) => <Button onClick={() => handleSunset(id)} type='danger'>下线</Button>}></NewsPublish>
        </div>
    )
}
