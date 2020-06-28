import React, { useState } from 'react'
import { Button, Input } from 'antd'
import axios from 'axios'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'


const { TextArea } = Input


const Comments = ({postId, refreshFunction, CommentLists}) => {
  const user = useSelector(state => state.user)

  const [Comment, setComment] = useState("")

  const handleChange = (e) => {
    setComment(e.currentTarget.value)
  }

  const variables = { 
    content: Comment,
    writer: user.userData._id,
    postId  
 }
  
  const onSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/comment/saveComment', variables)
    .then(response => {
      if (response.data.success) {
        setComment("")
        refreshFunction(response.data.result)
      } else {
        alert('Failed to save comment')
      }
    })
  }

  return (
    <div>
      <br />
      <p> replies</p>
      <hr />
      {/* Comment Lists  */}
       {console.log(CommentLists)} 
      
      {CommentLists && CommentLists.map((comment, index) => (
        (!comment.responseTo &&
          <React.Fragment key={index}>
          <SingleComment comment={comment} postId={postId} refreshFunction={refreshFunction}/>
          <ReplyComment CommentLists={CommentLists} postId={postId} refreshFunction={refreshFunction} parentCommentId={comment._id}/>
        </React.Fragment>
        )
      ))}

      {/* Root Comment Form */}
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleChange}
          value={Comment}
          placeholder="write some comments"
        />
        <br />
        <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
      </form>

    </div>
  )
}

export default Comments
