import React from 'react'
import { List, Avatar, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import SideVideo from './Sections/SideVideo'


const DetailVideoPage = (props) => {

  const videoId = props.match.params.videoId

  const [Video, setVideo] = useState([])

  const videoVariable = {
    videoId
  }

  useEffect(() => {
    axios.post('/api/video/getVideo', videoVariable)
      .then(response => {
        if (response.data.success) {
          // console.log(response.data.video)
          setVideo(response.data.video)
        } else {
          alert('Failed to get video Info')
        }
      })

  }, [videoVariable])

  return (
    <Row>
    <Col lg={18} xs={24}>
    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
      <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>
      <List.Item
        actions={[]}
      >
        <List.Item.Meta
          avatar={<Avatar src={Video.writer && Video.writer.image} />}
          title={<Link to="https://ant.design">{Video.title}</Link>}
          description={Video.description}
        />
        <div></div>
      </List.Item>

    </div>
      </Col>
      {/*2nd col*/}
      <Col lg={6} xs={24}>
        <SideVideo />
      </Col>
    </Row>
  )
}

export default DetailVideoPage
