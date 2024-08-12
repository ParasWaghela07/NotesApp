import Note from "../components/Note";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Nonote from "../components/Nonote";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
function Home() {
    const navigate=useNavigate();

    const [notes,setNotes]=useState([]);
    const [name,setname]=useState("");

    const [hehe,sethehe]=useState(true);

    async function getAllNotes(){
        try{
            sethehe(true);
            const response=await fetch('http://localhost:4000/getAllNotes',{
                method:'GET',
                headers:{
                    "Content-Type": "application/json"
                },
                credentials:"include"
            })

            const res=await response.json();
            // console.log(res);
            // console.log(res.Allnotes);

            if(res.success){
                setNotes(res.Allnotes);
                setname(res.name);
            }
            else{
                navigate('/');
            }
            sethehe(false);
        }
        catch(e){
            console.error("Error:", e);
        }
    }

    useEffect(()=>{
        getAllNotes();
    },[]);

    return (
        <div className="w-screen h-screen bg-gray-900 overflow-x-hidden flex flex-col items-center">
            <Navbar name={name}/>

            {
                hehe ? (
                    <Nonote/>
                ) : notes?.length > 0 ? (
                    notes.map((note, index) => (
                        <Note key={index} note={note} />
                    ))
                ) : (
                    <Nonote/>
                )
            }

        
        </div>
    );
}

export default Home;
