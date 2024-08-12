import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {AppContext} from "../context/AppContext"

function Note({note}){
    const {setTitle,setContent,setTime,setDay}=useContext(AppContext);
    const navigate=useNavigate();
    console.log(note.title , note.title.length)
    function show(){
        setTitle(note.title);
        setContent(note.body);
        setTime(note.time);
        setDay(note.day);
        navigate('/edit')
    }
    return(
    <div className="w-[90%] mx-auto my-3 rounded-md p-5 bg-gray-100 bg-opacity-10 hover:bg-opacity-20 cursor-pointer flex flex-col sm:flex-row gap-y-5 justify-between" onClick={show}>
        <div>
        {
            note.title.length<50 ? <h2 className="text-white font-semibold text-2xl md:text-3xl ">{note.title}</h2> : <h2 className="text-white font-semibold text-xl md:text-3xl">{note.title.substring(0,50)+ " ...."}</h2>
        }
        {
            note.body.length<=20 ?<p className="text-white font-light text-lg md:text-xl">{note.body}</p>: <p className="text-white font-light text-lg md:text-xl">{note.body.substring(0,20) + "......"}</p>
        }
        </div>
        <div className="flex flex-col sm:items-end w-[200px]">
        <p className="text-white font-semibold text-md sm:text-xl">{note.time}</p>
        <p className="text-white font-semibold text-md sm:text-xl">{note.day}</p>
        </div>
    </div>
    )
}

export default Note;