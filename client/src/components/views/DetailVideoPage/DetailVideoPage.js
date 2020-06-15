import React from 'react'
import { List, Avatar, Typography } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'


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
  )
}

export default DetailVideoPage
