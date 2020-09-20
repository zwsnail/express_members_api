const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')
const exphbs = require('express-handlebars');

const members = require('./Members.js')

const app = express();

//一般用么用server-side app想这种，要么用api前后端分离+Vue这些
//express-handlebars官方上面写的两行安装方式,类似于laravel的blade，还有EJS另一个npm包
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));//{ defaultLayout: 'main' }
app.set('view engine', 'handlebars');

//一直有错误，渲染不出来，我换了一个art-template
// app.engine('art', require('express-art-template'));
//view 改为view options，错误从 View is not a constructor 变成 callback is not a function
// app.set('view options', { debug: process.env.NODE_ENV !== 'production' });
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'art');



app.get('/art', (req, res) => {
    // res.render('home.art', { title: 'ok', members });//把home那页渲染出来
    res.render('home', { title: 'ok', members });//这个可以渲染出handlebars
});

//下面两行是post API发送body的时候需要
app.use(express.json())//express.json() will allow us to handle raw json
//写了这行，才可以post表格的时候发送body（腾讯视频里用了bodyParser，貌似可以直接这样了）
app.use(express.urlencoded({ extended: false }))


//to get a static folder
//不用api的时候，比如访问public下的网页localhost:5000/about.html必须加html
app.use(express.static(path.join(__dirname, 'public')))


//middleware中间键的一个列子运用
app.use(logger)//只要访问一次，下面控制台就打印

//访问链接时的api/members路由，都由api下面的members.js来处理
app.use('/api/members', require('./routes/api/members'))



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`)
);
//global是一个全局变量
// console.log(global)


// npm start & node index are gonna run the server without nodemon
// npm install -D nodemon 
// it's a dev dependency because it's only for development, we're not using it in production.
// npm run dev will run with nodemon 这个相当于多了一个watch


