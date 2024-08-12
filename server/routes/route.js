const express=require('express');
const router=express.Router();


const {auth}=require('../middlewares/auth');
const {signup,login}=require('../controllers/Auth');
const {getAllNotes,addNote,deleteNote,updateNote}=require('../controllers/Notes');

router.post('/signup',signup);
router.post('/login',login);

router.get('/alreadyloggedin',auth,(req,res)=>{
    return res.json({
        success:true,
        message:"Logged in successfully"
    })
})

router.get('/logout',(req,res)=>{
    try{
        return res.clearCookie('token').json({
            success: true,
            message: "User Logged Out Successfully"
        });
        
    }
    catch(e){
        return res.json({
            success:false,
            message:"Errors while logging out"
        })
    }
})

router.get('/getAllNotes',auth,getAllNotes);
router.post('/addNote',auth,addNote);
router.post('/deleteNote',auth,deleteNote);
router.post('/updateNote',updateNote);


module.exports=router;