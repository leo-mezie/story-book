const express = require('express')
const router = express.Router()
const passport = require('passport')


//@desc  auth with google
// route  GET/auth/google
router.get('/google', passport.authenticate('google',{scope:['profile']}))



//@desc  
// route  GET/auth/google/callback
router.get('/google/callback', 
passport.authenticate('google', {failureRedirect:'/'}),(req,res)=>{  //goes backt to home if authentication fails
    // on success
    res.redirect('/dashboard')
})



// @desc logout user
// @route /auth/logout

router.get('/logout', (req,res, next)=>{
    req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/')
});
});


module.exports = router;