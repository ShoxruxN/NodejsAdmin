const {Router} = require('express')
const router = Router()
const Genre = require('../modeles/genre')
const Book = require('../modeles/book')
const auth = require('../middleware/auth')
router.get('/',auth,async(req,res)=>{
    const books = await Book.find().populate('genreId').lean()
    res.render('book/index',{
        title: 'Kitoblar ro`yhati',
        books
    })
})

router.get('/new',auth,async(req,res)=>{
    const genres = await Genre.find().lean()
    res.render('book/new',{
        title: 'Yangi kitobni kiritish',
        genres
    })
})

router.post('/del',auth,async(req,res)=>{
    const _id = req.body._id
    await Book.findByIdAndDelete({_id})
    res.redirect('/book/')
})

router.post('/',auth,async(req,res)=>{
    try {
        let {name,count,price,author,year,page,genreId,lang,text,publisher,type,isbn} = req.body
        let img = req.file.path // !
        name = name.toLowerCase()
        const book = await new Book({name,count,price,author,year,page,genreId,img,lang,text,publisher,type,isbn})
        await book.save()
        res.redirect('/book/')
    } catch (error) {
        console.log(error)
    }
})

router.post('/save',auth,async(req,res)=>{
    const {name,count,price,author,year,page,genreId,lang,text,publisher,type,isbn,_id} = req.body
    const img = req.file.path
    const book = {name,count,price,author,year,page,genreId,img,lang,text,publisher,type,isbn}
    await Book.findByIdAndUpdate({_id},book)
    res.redirect('/book/'+_id)
})

router.get('/edit/:id',auth,async(req,res)=>{
    const _id = req.params.id
    const genres = await Genre.find().lean()
    const book = await Book.findOne({_id}).lean()
    res.render('book/edit',{
        title: `${book.name} kitobni tahrirlash`,
        book, genres
    })
})

router.get('/:id',auth,async(req,res)=>{
    const _id = req.params.id
    const book = await Book.findOne({_id}).populate('genreId').lean()
    res.render('book/view',{
        title: `${book.name} | ${book.author}`,
        book
    })
})

module.exports = router