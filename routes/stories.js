

const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
// const passport = require('passport')

const Story = require('../models/story')


//@desc  show add page
// route  GET/stories/add
router.get('/add', ensureAuth,(req,res)=>{
    res.render('stories/add')
})



//@desc  process add form 
// route  POST / stories
router.post('/', ensureAuth,async(req,res)=>{
try{
    // to get user

    req.body.user = req.user.id
    await Story.create(req.body)
    res.redirect('/dashboard')
}catch(err){
    console.error(err)
    res.render('errors/500')
}
})




//@desc  show all stories
// route  GET/stories
router.get('/', ensureAuth, async(req,res)=>{
   try{

        const stories =  await Story.find({ status: 'public'})
        .populate('user')
        .sort({ createdAt: "desc" })
        .lean()

        res.render('stories/index',{
            stories,
        })

   }catch(err){
    console.error(err)
    res.render('error/500')
   }
})



module.exports = router;