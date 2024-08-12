import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import { useEffect } from "react";

function Auth(){
    const  navigate=useNavigate();

    async function checkCookie(){
        try{
            const response=await fetch('http://localhost:4000/alreadyloggedin',{
                method:'GET',
                headers:{
                    "Content-Type": "application/json"
                },
                credentials:"include"
            })

            const res=await response.json();

            if(res.success){
                navigate('/home')
            }
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        checkCookie();
    },[])

    return(
        <div className="w-screen h-screen bg-gray-900 flex justify-center items-center flex-col gap-y-6">
            <button className="text-2xl bg-slate-400 p-2 rounded-lg font-semibold hover:text-white hover:bg-black transition duration-200" onClick={()=>navigate('/signup')}>Create Account</button>
            <button className="text-2xl bg-slate-400 p-2 rounded-lg font-semibold hover:text-white hover:bg-black transition duration-200"
            onClick={()=>navigate('/login')}>Log In</button>
        </div>
    )
}

export default Auth;