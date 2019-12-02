const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

const config = require('./config.json')
const { PORT, storage } = config

const fileserver = express()
const upload = multer({ 
  storage: multer.diskStorage({
    destination: (req, file, cb) => { 
      cb(null, storage) 
    },
    filename: (req, file, cb)=>{
      cb(null, file.originalname)
    }
  }) 
})

fileserver.use(bodyParser.json())
fileserver.use(bodyParser.urlencoded({ extended: true }))

fileserver.listen(PORT, () => console.log(`FileServer LISTENING on ${PORT}`))

fileserver.post('/_upload', (req, res) => {
  upload.single('fileupload')(req, res, (err)=>{
    if(err) return res.send(err)
    
    res.contentType('html')
    res.send(`Success <br><a href='http://static.zrthxn.com/${req.file.originalname}'>Permalink</a>`)
  })
})