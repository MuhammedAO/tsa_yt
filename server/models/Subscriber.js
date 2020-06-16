const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//userTo => the person's channel you're subscribing to
//userFrom => the person subscribing

const subscriberSchema = mongoose.Schema({
  userTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

}, { timestamps: true })


const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber }