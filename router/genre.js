const {Router} = require('express')
const router = Router()
const Genre = require('../modeles/genre')

router.get('/',async(req,res)=>{
    const genres = await Genre.find().lean()
    res.render('genre/index',{
        title: 'Janrlar ro`yhati',
        genres,
        error: req.flash('error'),
        success: req.flash('success')
    })
})

router.get('/del/:id',async(req,res)=>{
    await Genre.findByIdAndDelete(req.params.id)
    res.redirect('/genre')
})

router.post('/',async(req,res)=>{
    const {name} = req.body
    const haveGenre = await Genre.findOne({name})
    if (haveGenre){
        req.flash('error','Bunday janr bor!')
        res.redirect('/genre')
    } else {
        const genre = await new Genre({name})
        await genre.save()
        req.flash('success','Yangi janr ro`yhatdan o`tkazildi')
        res.redirect('/genre')
    }
})


module.exports = router