const {Router} = require('express')
const router = Router() 
const auth = require('../middleware/auth')
const Book = require('../modeles/book')

router.get('/',auth,(req,res)=>{
    res.render('index',{
        title: 'Bosh sahifa',
        isHome: true
    })
})

router.post('/search',auth,async(req,res)=>{
    const {st} = req.body
    const books = await Book.find({name: { $regex: '.*' + st.toLowerCase() + '.*' } }).select('_id name').lean()
    res.render('search',{
        title: `${st} so'zi bo'yicha qidiruv natijasi:`,
        books
    })
})

module.exports = router