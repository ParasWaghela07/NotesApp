import { useNavigate } from "react-router-dom";

import {toast} from "react-hot-toast";

function Navbar({name}){
    const navigate=useNavigate();
    
    async function logout(){
        try{
            const response=await fetch('http://localhost:4000/logout',{
                method:'GET',
                headers:{
                    "Content-Type": "application/json"
                },
                credentials:'include'
            })

            const res=await response.json();

            if(res.success){
                toast.success(res.message);
                navigate('/')
            }
        }
        catch(e){
            toast.error(e);
        }
    }

    return (
    <div className="w-[95%] text-white mx-auto py-10 flex flex-col lg:flex-row justify-between gap-y-5">
        <h1 className="font-extrabold text-4xl md:text-5xl">Hello, {name} !</h1>

        <div className="flex gap-x-5">
            <button className="font-bold text-2xl bg-opacity-20 p-2 rounded-md bg-green-400" onClick={()=>{navigate('/addnote')}}>Add Note</button>
            <button className="font-bold text-2xl bg-opacity-20 p-2 rounded-md bg-red-400" onClick={logout}>Log Out</button>
        </div>
    </div>
    )
}

export default Navbar;