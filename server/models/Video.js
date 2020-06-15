const mongoose = require('mongoose');

const Schema = mongoose.Schema

//The writer has a type of schema.types b/c we want to reference a user,
//and bring in all the details of that user.
const videoSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    maxlength: 50,
  },
  description: {
    type: String,
  },
  privacy: {
    type: Number,
  },
  filePath: {
    type: String,
  },
  category: {
    type: String
  },
  views: {
    type: Number,
    default: 0
  },
  duration: {
    type: String
  },
  thumbnail: {
    type: String
  }
}, { timestamps: true })

//timestap will automatically generate the createdAt and updatedAt

const Video = mongoose.model('Video', videoSchema)

module.exports = { Video }