const userschema=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.signup=async (req,res)=>{
    try{
        const {name,email,password,confirmpassword}=req.body;

        if(!name || !email || !password ||!confirmpassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const alreadyExist=await userschema.findOne({email});

        if(alreadyExist){
            return res.json({
                success:false,
                message:"User already exist with this email id"
            })
        }

        if(password !== confirmpassword){
            return res.json({
                success:false,
                message:"Password and Confirm passwords are not matching"
            })
        }

        let hashedPass;
        try{
            hashedPass=await bcrypt.hash(password,10);
        }
        catch(e){
            return res.status(500).json({
                success:false,
                message:"Error occured during hashing"
            })
        }

        const newuserschema=await userschema.create({
            name,email,password:hashedPass
        })

        return res.status(200).json({
            success:true,
            message:"Account Created Succuessfully,Please Log in to continue"
        })
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error during signup",
            error:e.message
        })
    }
}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;

    if(!email || !password){
        return res.status(333).json({
            success:false,
            message:"All fields are required"
        })
    }

    const prevEntry=await userschema.findOne({email});
    if(!prevEntry){
        return res.status(404).json({
            success:false,
            message:"Email id is not registered"
        })
    }

    if(await bcrypt.compare(password,prevEntry.password)){
        const payload={
            id:prevEntry._id,
            name:prevEntry.name,
            email:prevEntry.email
        }

        let token=jwt.sign(payload,process.env.JWT_SECRET);

        const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }
        return res.cookie('token',token,options).status(200).json({
            success:true,
            message:"Login Successful"
        })
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Incorrect Password"
        })
    }
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"login failed"
        })
    }
}