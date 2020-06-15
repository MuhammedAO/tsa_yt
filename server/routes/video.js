const express = require('express')
const router = express.Router()
const multer = require('multer')
const ffmpeg = require('fluent-ffmpeg')

const {Video} = require('../models/Video')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  //allowing only .mp4 file
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.mp4') {
      return cb(res.status(400).end('only mp4 file is allowed'), false)
    }
    cb(null, true)
  }
})

const upload = multer({ storage }).single("file")


//file upload
router.post("/uploadfiles", (req, res) => {
  //upload video
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err })
    }
    //Send this info to the client b/c we'll need the fileName when populating the Data 
    return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
  })
});

//video upload
router.post("/uploadVideo", (req, res) => {
  //get variables sent from the client and put that data inside
  const video = new Video(req.body)

  //save
  video.save((err, video) => {
    if (err) return res.status(400).json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })

})

//get videos
router.get("/getVideos", (req, res) => {
  //Find all of the data inside the video collection using the video model.
  //find by populating with all writers info
  //execute the query/request
  Video.find()
  .populate('writer')
  .exec((err, videos) => {
   if (err) return res.status(400).send(err)
   res.status(200).json({success: true, videos})
  })

})

//get video
router.post("/getVideo", (req, res) => {
  //find the video that matches the videoId variable that was passed from the F.E
  Video.findOne({ "_id": req.body.videoId })
    .populate('writer')
    .exec((err, video) => {
      if (err) return res.status(400).send(err)
      res.status(200).json({ success: true, video })
    })
})

//thumbnail
router.post("/thumbnail", (req, res) => {
  
  let thumbsFilePath = ""
  let fileDuration = ""
  
    //thumbnail filepath and fileduration
  ffmpeg.ffprobe(req.body.filePath, (err, metadata) => {
    console.dir(metadata)
    console.log(metadata.format.duration)
    fileDuration = metadata.format.duration
  })
   
  ffmpeg(req.body.filePath)
  .on('filenames', function(filenames) {
    //if everything goes well
    console.log('Will generate ' + filenames.join(', '))
    thumbsFilePath = "uploads/thumbnails/" + filenames[0]
  })
  .on('end', function() {
    console.log('Screenshots taken')
    //Send msg to client in json fmt.
    return res.json({success: true, thumbsFilePath, fileDuration})
  })
  .screenshots({
    // Will take screens at 20%, 40%, 60% and 80% of the video
    //sC 3times = 3 thumbnails
    //folder is where the thumbnail will be saved.
    count: 3,
    folder: 'uploads/thumbnails',
    size: '320x240',
    filename:'thumbnail-%b.png'
  });
});


module.exports = router;
