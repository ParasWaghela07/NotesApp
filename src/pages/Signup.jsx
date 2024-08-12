import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [pass, setpass] = useState("");
    const [cpass, setcpass] = useState("");

  const [eye1, seteye1] = useState(false);
  const [eye2, seteye2] = useState(false);

  const navigate=useNavigate();

  
  function nameHandler(e){
    console.log(name);
    setname(e.target.value);
}

function emailHandler(e){
    console.log(email);
    setemail(e.target.value);
}

  function passhandler(e) {
    setpass(e.target.value);
  }
  function cpasshandler(e) {
    setcpass(e.target.value);
  }

  async function submitHandler() {
    try {
        console.log("Tapped");
        const response = await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: pass,
                confirmpassword: cpass
            }),
            credentials: "include"
        });
        const res = await response.json();
        // console.log(res);

        console.log("Response received:", res);
        if (res.success) {
           toast.success(res.message)
            // console.log("Navigating to home page");
            navigate('/');
        } else {
            toast.error(res.message); 
        }
    } catch (e) {
      console.log("hurr")
        console.error("Error:", e);
    }
}


  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-y-5 bg-gray-900 text-white">
      <div className="flex flex-col gap-y-5 items-start">
        <h1 className="text-4xl">Create New Account</h1>

        <div className="w-full">
          <p className="font-semibold text-xl">Name</p>
          <input
            className="bg-gray-500 p-2 rounded-md outline-none text-lg w-full"
            type="text"
            value={name}
            onChange={nameHandler}
          />
        </div>

        <div className="w-full">
          <p className="font-semibold text-xl">Email</p>
          <input
            className="bg-gray-500 p-2 rounded-md outline-none text-lg w-full"
            type="email"
            value={email}
            onChange={emailHandler}
          />
        </div>

        <div className="w-full">
          <p className="font-semibold text-xl">Password</p>
          <div className="flex justify-center items-center gap-x-2">
            <input
              className="bg-gray-500 p-2 rounded-md outline-none text-lg w-full"
              type={eye1 ? "text" : "password"}
              value={pass}
              onChange={passhandler}
            />

            {eye1 ? (
              <IoEyeOutline
                className="text-2xl cursor-pointer"
                onClick={() => seteye1(!eye1)}
              />
            ) : (
              <IoEyeOffOutline
                className="text-2xl cursor-pointer"
                onClick={() => seteye1(!eye1)}
              />
            )}
          </div>
        </div>

        <div className="w-full">
          <p className="font-semibold text-xl">Confirm Password</p>
          <div className="flex justify-center items-center gap-x-2">
            <input
              className="bg-gray-500 p-2 rounded-md outline-none text-lg w-full"
              type={eye2 ? "text" : "password"}
              value={cpass}
              onChange={cpasshandler}
            />

            {eye2 ? (
              <IoEyeOutline
                className="text-2xl cursor-pointer"
                onClick={() => seteye2(!eye2)}
              />
            ) : (
              <IoEyeOffOutline
                className="text-2xl cursor-pointer"
                onClick={() => seteye2(!eye2)}
              />
            )}
          </div>
        </div>

        <button className="p-2 text-xl font-semibold bg-green-600 rounded-lg text-white w-full hover:bg-green-500" onClick={submitHandler}>Create Account</button>
      </div>
    </div>
  );
}

export default Signup;
