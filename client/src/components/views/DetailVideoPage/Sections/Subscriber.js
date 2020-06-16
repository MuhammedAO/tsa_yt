import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Subscriber = ({ userTo, userFrom }) => {

  const subscribeNumberVariables = { userTo, userFrom }

  const [SubscribeNumber, setSubscribeNumber] = useState(0)
  const [Subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
      .then(response => {
        if (response.data.success) {
        // console.log(response.data.subscribeNumber)
        setSubscribeNumber(response.data.subscribeNumber)
        
        } else {
          alert('Failed to get subscriber number')
        }
      })

      //check if already subscribed
      axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
      .then(response => {
        if (response.data.success) {
          // console.log(response.data.subscribed)
          setSubscribed(response.data.subcribed)
        } else {
          alert('Failed to get subscriber info')
        }
      })

  }, [])

  return (
    <div>
      <button style={{
        backgroundColor:`${Subscribed ? '#AAAAA' : '#CC0000'}`,
        borderRadius: '3px', color: 'white',
        padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase',
      }}>
      {SubscribeNumber} {Subscribed ? 'Subscribed' :
      'Subscribe'}
   </button>
    </div>
  )
}

export default Subscriber
