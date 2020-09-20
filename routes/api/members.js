const express = require('express');
const members = require('../../Members') // .. outside api folder .. outside routes folder 
const uuid = require('uuid')


//实例一个路由
const router = express.Router()

// get all members
router.get('/', (req, res) => res.json(members))

// get a specific elem
router.get('/:id', (req, res) => {

    const found = members.some((member) => member.id === parseInt(req.params.id))
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        //status更改状态码，不然一直都是200
        res.status(400).json({ msg: `no member with the id of ${req.params.id}` })
    }
})



// router.post('http://localhost:5000/home', (req, res) => {
//     res.send(req.body)
//     res.redirect('http://localhost:5000/api/members')
// })


//create a member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),  //没有数据库，用这个第三方来生成一个唯一id
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and an email' })
    }

    members.push(newMember);
    // res.json(members)
    res.redirect('localhost:5000/art');//必须刷新才能看到新的添加
})


//update member 

router.put('/:id', (req, res) => {
    // check to see if the member exists
    const found = members.some((member) => member.id === parseInt(req.params.id))
    if (found) {
        const updMember = req.body
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;//没有改用以前的
                member.email = updMember.email ? updMember.email : member.email;
                res.json({ msg: 'member updated', member })//发送msg，外加把member也法发过去（member：member）简写了ES6语法
            }
        })

    } else {
        res.status(400).json({ msg: `no member with the id of ${req.params.id}` })
    }
})

//Delete member

router.delete('/:id', (req, res) => {

    const found = members.some((member) => member.id === parseInt(req.params.id))
    if (found) {

        res.json({ msg: 'Member deleted successfully', members: members.filter(member => member.id !== parseInt(req.params.id)) })
    } else {
        res.status(400).json({ msg: `no member with the id of ${req.params.id}` })
    }
})


module.exports = router;




