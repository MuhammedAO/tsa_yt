import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'


const SideVideo = () => {

  const [SideVideos, setSideVideos] = useState([])

  useEffect(() => {
    axios.get('/api/video/getVideos')
    .then(response => {
        if (response.data.success) {
            console.log(response.data.videos)
            setSideVideos(response.data.videos)
        } else {
            alert('Failed to get Videos')
        }
    })

    
  }, [])
 
 const sideVideoItem = SideVideos.map((video, index) => {

  let minutes = Math.floor(video.duration / 60)
  let seconds = Math.floor(video.duration - minutes * 60)

  return <div style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }} key={index}>

  <div style={{ width:'40%', marginRight:'1rem' }}>
    <a href={`/video/${video._id}`}  style={{ color:'gray' }}>
      <img src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" style={{ width: '100%' }} />
    </a>
  </div>

  <div style={{ width:'50%' }}>
    <Link to={`/video/${video._id}`}  style={{ color:'gray' }}>
      <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}</span><br />
      <span>{video.writer.name}</span><br />
      <span>{video.views}</span><br />
      <span>{minutes} : {seconds}</span><br />
    </Link>
  </div>

</div>
 })

  return (
    <React.Fragment>
    <div style={{ marginTop:'3rem' }}></div>
    {sideVideoItem}
    </React.Fragment>
    
  )
}

export default SideVideo
