const {Router} = require('express')
const User = require('../modeles/user')
const auth  = require('../middleware/auth')
const router = Router()
router.get('/',auth,async(req,res)=>{
    const users = await User.find().lean()
    res.render('users',{
        title: 'Foydalanuvchilar',
        isUsers:true,
        users
    })
})
router.get('/new',auth,(req,res)=>{
    res.render('newuser',{
        title: 'Yangi foydalanuvchi'
    })
})
router.post('/',auth, async (req,res)=>{
    const user = await new User({
        name: req.body.name,
        email: req.body.email,
        skills: req.body.skills,
        avatar: req.body.avatar
    })
    user.save()
    res.redirect('/users')
})
module.exports = router