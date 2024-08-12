import {toast} from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddNote() {
    const navigate = useNavigate();

    const [newTitle,setnewTitle]=useState("");
    const [newContent,setnewContent]=useState("");

    function titleHandler(e){
        setnewTitle(e.target.value)
    }

    function contentHandler(e){
        setnewContent(e.target.value);
        
    }


    async function handleSave(){
        console.log("Tapped")
        try{
            const response=await fetch('http://localhost:4000/addNote',{
                method:'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    title:newTitle,
                    content:newContent
                }),
                credentials:"include"
            })

            const res=await response.json();
            // console.log(res);
            if(res.success){
                toast.success('Note added Successfully');
                navigate('/home');
            }
            else{
                toast.error(res.message)
            }
        }
        catch(e){
            console.log('Something went wrong')
            console.log(e)
        }
    }

    return (
        <div className="w-screen h-screen bg-gray-900 flex justify-center items-center text-white">
            <div className="flex flex-col w-[80%] gap-y-10">
                <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-y-3">
                    <input value={newTitle} type="text" placeholder="Title..." className="text-lg sm:text-3xl font-bold outline-none bg-gray-100 bg-opacity-20 p-3 rounded-lg w-full sm:w-fit" onChange={titleHandler} />
                    <div className="flex gap-x-5">
                        <button
                            onClick={handleSave}
                            className="font-bold text-lg sm:text-2xl bg-opacity-50 p-2 rounded-md bg-green-400"
                        >
                            Create
                        </button>
                    </div>
                </div>
                <textarea
                    value={newContent}
                    onChange={contentHandler}
                    className="font-semibold text-lg sm:text-xl outline-none bg-gray-100 bg-opacity-20 p-5 rounded-lg w-full h-[500px]"
                    placeholder="Enter your content here..."
                    style={{
                        overflow: 'auto', // Ensure scroll is possible
                        scrollbarWidth: 'none', // Hide scrollbar for Firefox
                        resize: 'none', // Prevent manual resizing
                        
                    }}
                />
            </div>
        </div>
    );
}

export default AddNote;
