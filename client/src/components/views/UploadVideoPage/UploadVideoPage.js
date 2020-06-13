import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { useSelector } from 'react-redux'

const { Title } = Typography
const { TextArea } = Input

const Private = [
  { value: 0, label: 'Private' },
  { value: 1, label: 'Public' }
]

//add more categories if u like
const Catogory = [
  { value: 0, label: "Film & Animation" },
  { value: 0, label: "Programming & Computer Science" },
  { value: 0, label: "Music" },
  { value: 0, label: "Pets & Animals" },
  { value: 0, label: "Sports" },
]

const UploadVideoPage = (props) => {
  //redux hook to get userId from redux state
  const user = useSelector(state => state.user)

  const [title, setTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [privacy, setPrivacy] = useState(0)
  const [Categories, setCategories] = useState("Film & Animation")
  const [filePath, setfilePath] = useState("")
  const [Duration, setDuration] = useState("")
  const [ThumbNail, setThumbNail] = useState("")

  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value)
  }


  const handleChangeDecsription = (event) => {
    setDescription(event.currentTarget.value)
  }

  const handleChangeOne = (event) => {
    setPrivacy(event.currentTarget.value)
  }

  const handleChangeTwo = (event) => {
    setCategories(event.currentTarget.value)
  }

  const onSubmit = (event) => {
        event.preventDefault()
         
    //Prevent from uploading if you're not logged in.
    if (user.userData && !user.userData.isAuth) {
      return alert('Please Log in First')
    }
    //fill out all fields
    if (title === "" || Description === "" ||
      Categories === "" || filePath === "" ||
      Duration === "" || ThumbNail === "") {
      return alert('Please fill all the fields')
    }

    const variables = {
      //The writer who is posting the video
      writer: user.userData._id,
      title: title,
      description: Description,
      privacy: privacy,
      filePath: filePath,
      category: Categories,
      duration: Duration,
      thumbnail: ThumbNail
    }

      axios.post('/api/video/uploadVideo', variables)
          .then(response => {
              if (response.data.success) {
                  alert('video Uploaded Successfully')
                  //redirect
                  props.history.push('/')
              } else {
                  alert('Failed to upload video')
              }
          })
  }

  const onDrop = (files) => {
    //When we are sending the file to backend using http,
    //we need to put this config inside http return so that we don't have errors.
   let formData = new FormData()
   const config = {
     header: {'content-type': 'multipart/form-data'}
   }
   console.log(files)
   //we want send only one video thats why => files[0]
   formData.append("file", files[0])

   //axios
   axios.post('/api/video/uploadfiles', formData, config)
   .then(response => {
     if(response.data.success) {
      // console.log(response)
      let variable = {
        filePath: response.data.filePath,
        fileName: response.data.fileName
      }
      setfilePath(response.data.filePath)

      //generate thumbnail with this filePath.
      axios.post('/api/video/thumbnail', variable)
      .then(response => {
        if (response.data.success) {
          setDuration(response.data.fileDuration)
          setThumbNail(response.data.thumbsFilePath)
        } else {
          alert('Failed to make the thumbnail')
        }
      })

     } else {
       alert('Failed to save the video in the server')
     }
   })
  }


  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} > Upload Video</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* upload video box*/}
          <Dropzone
          onDrop={onDrop}
            multiple={false}
            maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                {...getRootProps()}>
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: '3rem' }} />
              </div>
            )}
          </Dropzone>
          {/*Thumbnail*/}
            {ThumbNail !== "" &&
            <div>
                <img src={`http://localhost:5000/${ThumbNail}`} alt="haha" />
            </div>
            } 
        </div>
        <br /><br />
        <label>Title</label>
        <Input
          onChange={handleChangeTitle}
          value={title}
        />
        <br /><br />
        <label>Description</label>
        <TextArea
          onChange={handleChangeDecsription}
          value={Description}
        />
        <br /><br />
        {/*Privacy Select*/}
        <select onChange={handleChangeOne}>
          {Private.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>
        <br /><br />
        {/*Category select */}
        <select onChange={handleChangeTwo}>
          {Catogory.map((item, index) => (
            <option key={index} value={item.label}>{item.label}</option>
          ))}
        </select>
        <br /><br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
       </Button>
      </Form>
    </div>
  )
}

export default UploadVideoPage
