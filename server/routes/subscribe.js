const express = require('express')
const router = express.Router()

const { Subscriber } = require("../models/Subscriber")

//number of subscribers
router.post("/subscribeNumber", (req, res) => {

  Subscriber.find({ "userTo": req.body.userTo })
  .exec((err, subscribe) => {
      if(err) return res.status(400).send(err)

      res.status(200).json({ success: true, subscribeNumber: subscribe.length  })
  })

})

//route for checking if u're a subscriber
router.post("/subscribed", (req, res) => {

  Subscriber.find({ "userTo": req.body.userTo , "userFrom": req.body.userFrom })
  .exec((err, subscribe) => {
      if(err) return res.status(400).send(err)
       
      //not a subscriber
      let result = false
      if(subscribe.length !== 0) {
        //subscriber
          result = true
      }

      res.status(200).json({ success: true, subscribed: result  })
  })

})

//subscribe route
router.post("/subscribe", (req, res) => {
  const subscribe = new Subscriber(req.body)
  subscribe.save((err, doc) => {
    if (err) return res.json({ subscribe: false, err })
   return res.status(200).json({ success: true })
  })
})

// unsubscribe
router.post("/unSubscribe", (req, res) => {
  Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err })
      res.status(200).json({ success: true, doc })
    })
})

module.exports = router

