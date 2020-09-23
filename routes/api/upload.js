const express = require('express')
const router = express.Router()

const tools = require('../../tools.js');

//the name of the picture in the form表单里面name字段
// router.post('/upload', upload.single('pic'), (req, res) => {
// 上面的upload已经被tools封装了，single是multer插件文档里的api

router.post('/one', tools.multer().single('pic'), (req, res) => {
    res.send({
        body: req.body,
        file: req.file
    })
})

//多张图片上传注意点  1. fields  2. files
let multi = tools.multer().fields([{ name: 'pic1', maxCount: 1 }, { name: 'pic2', maxCount: 1 }])
router.post('/multi', multi, (req, res) => {
    res.send({
        body: req.body,
        file: req.files  //这个地方是files
    })
})

module.exports = router;

