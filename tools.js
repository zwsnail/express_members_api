const multer = require('multer');
const path = require('path');
const sd = require('silly-datetime');//按时间将上传图片分类
const mkdirp = require('mkdirp');  //只用在日期文件夹进行查找（方便大规模文件查找）

let tools = {
    multer() {
        var storage = multer.diskStorage({
            destination: async (req, file, cb) => { //cb来自multer库
                let day = sd.format(new Date(), 'YYYYMMDD')//用第三方silly-datetime获取当前时间格式
                let dir = path.join("public/uploadedPictures", day)//拼接一个按时间分类上传文件的目录
                await mkdirp(dir)//mkdirp生成的是一个promise，把异步改成同步，等待创建好了再往下走

                cb(null, dir)//必须确保先有目录才能上传文件
            },
            filename: function (req, file, cb) {
                let extname = path.extname(file.originalname);//获取文件后缀名
                cb(null, Date.now() + extname) //自定义文件名
            }
        })

        var upload = multer({ storage: storage });
        return upload;
    },
    md5() { }//比如还有其他方法
};

module.exports = tools;