import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Subscriber = ({ userTo, userFrom }) => {

  const [SubscribeNumber, setSubscribeNumber] = useState(0)
  const [Subscribed, setSubscribed] = useState(false)


  const subscribeNumberVariables = { userTo, userFrom }

  const onSubscribe = () => {
   
    let subscribeVariables = { userTo, userFrom }

   if (Subscribed) {
     //when we're already subscribed
     axios.post('/api/subscribe/unSubscribe', subscribeVariables)
     .then(response => {
       if (response.data.success) {
        setSubscribeNumber(SubscribeNumber - 1)
        setSubscribed(!Subscribed)
       } else {
         alert('Failed to unsubscribe')
       }
     })
   } 
   else {
     //when we're not subscribed
     axios.post('/api/subscribe/subscribe', subscribeVariables)
     .then(response => {
       if (response.data.success) {
        setSubscribeNumber(SubscribeNumber + 1)
        setSubscribed(!Subscribed)
       } else {
         alert('Failed to subscribe')
       }
     })
   }
  }

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
          setSubscribed(response.data.subscribed)
        } else {
          alert('Failed to get subscriber info')
        }
      })

  }, [subscribeNumberVariables])

 

  return (
    <div>
      <button 
      onClick={onSubscribe}
      style={{
        backgroundColor:`${Subscribed ? '#AAAAAA' : '#CC0000'}`,
        borderRadius: '3px', color: 'white',
        padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase',
      }}>
      {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
   </button>
    </div>
  )
}

export default Subscriber