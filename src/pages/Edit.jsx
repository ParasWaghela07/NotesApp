import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";

function Edit() {
    const navigate = useNavigate();
    const { title, setTitle, content, setContent, time, setTime, day, setDay } = useContext(AppContext);

    // Handle content change
    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    // Handle title change
    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    // Handle save button click
    async function deleteHandler(){
        try{
            const response=await fetch('http://localhost:4000/deleteNote',{
                method:'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    title:title
                }),
                credentials:"include"
            })

            const res=await response.json();
            if(res.success){
                toast.success("Note deleted Successfully")
                navigate('/home')
            }
        }
        catch(e){
            console.log('Something went wrong')
            console.log(e)
        }
    }

    useEffect(() => {
        // Check if the page is being refreshed
        const isPageRefreshed = sessionStorage.getItem('isPageRefreshed');

        if (isPageRefreshed) {
            // Redirect to /home if page is refreshed
            navigate('/home');
        } else {
            // Set flag to indicate that the page has been loaded
            sessionStorage.setItem('isPageRefreshed', 'true');
        }

        // Clean up flag on component unmount
        return () => {
            sessionStorage.removeItem('isPageRefreshed');
        };
    }, [navigate]);

    async function saveHandler(){
        try{
            const response=await fetch('http://localhost:4000/updateNote',{
                method:'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    title:title,
                    content:content
                }),
                credentials:"include"
            })

            const res=await response.json();
            if(res.success){
                toast.success(res.message)
                navigate('/home')
            }
        }
        catch(e){
            console.log('Something went wrong')
            console.log(e)
        }
    }

    return (
        <div className="w-screen h-screen bg-gray-900 flex justify-center items-center text-white overflow-y-hidden">
            <div className="flex flex-col w-[80%] gap-y-10 ">
                <div className="flex flex-col gap-y-2  lg:flex-row lg:justify-between">
                    <p className="text-2xl lg:text-4xl font-bold flex items-center outline-none bg-gray-900 bg-opacity-20 rounded-lg w-[100%] md:w-[60%]">{title}</p>
                    <div className="flex gap-x-5">
                        <div className="font-medium text-md md:text-xl">
                                <p>{time}</p>
                                <p>{day}</p>
                        </div>
                    </div>
                </div>
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    className="text-lg md:text-xl outline-none bg-gray-100 bg-opacity-20 p-5 rounded-lg w-full h-[250px] lg:h-[400px]"
                    placeholder="Enter your content here..."
                    style={{
                        overflow: 'auto', // Ensure scroll is possible
                        scrollbarWidth: 'none', // Hide scrollbar for Firefox
                        resize: 'none', // Prevent manual resizing
                    }}
                />
                <button onClick={saveHandler} className="font-bold  text-lg md:text-2xl bg-opacity-50 p-2 rounded-md bg-green-400">
                    Save
                </button>
                <button  className="font-bold  text-lg md:text-2xl bg-opacity-50 p-2 rounded-md bg-red-400" onClick={deleteHandler}>
                    Delete Note
                </button>
            </div>
        </div>
    );
}

export default Edit;
