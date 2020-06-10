import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd'
import Dropzone from 'react-dropzone'
import axios from 'axios'

const { Title } = Typography
const { TextArea } = Input

const Private = [
  { value: 0, label: 'Private' },
  { value: 1, label: 'Public' }
]

//add more categories if u like
const Catogory = [
  { value: 0, label: "Film & Animation" },
  { value: 0, label: "Autos & Vehicles" },
  { value: 0, label: "Music" },
  { value: 0, label: "Pets & Animals" },
  { value: 0, label: "Sports" },
]

const UploadVideoPage = () => {

  const [title, setTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [privacy, setPrivacy] = useState(0)
  const [Categories, setCategories] = useState("Film & Animation")
  const [filePath, setfilePath] = useState("")

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

  const onSubmit = () => {
        
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
