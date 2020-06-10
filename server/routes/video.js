const express = require('express')
const router = express.Router()
const multer = require('multer')

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


module.exports = router;
