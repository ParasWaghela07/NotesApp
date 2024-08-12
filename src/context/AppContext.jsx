import { createContext,useState } from "react";

export const AppContext=createContext();

export default function AppContextProvider({children}){
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [time,setTime]=useState("");
    const [day,setDay]=useState("");

    const value={
        title,setTitle,content,setContent,time,setTime,day,setDay
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}