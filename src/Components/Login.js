import React,{useState,useRef} from "react";
import './Login.css'
import axios from "axios";
import { useHistory } from "react-router-dom";
import { authActions } from "../Pages/Store/AuthStore";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../Pages/Store/DataActions";


const WEB_API='AIzaSyBmu2iAn2bEUPLR2hBHCQAhknCpMMWjz3o';
const url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API}`;



const Login=()=>{
    const emailRef=useRef();
    const passwordRef=useRef();
    const[error,setError]=useState();
    const history=useHistory();
    const dispatch=useDispatch();
    const isLogin=useSelector((state)=>state.author.isAuthenticated)

    const  loginHandler=async(event)=>{
        event.preventDefault();
        const email=emailRef.current.value;
        const password=passwordRef.current.value;
        const userData={
            email:email,
            password:password,
        }
        console.log("userData",userData)
        dispatch(loginRequest(userData) )
        if(isLogin){
          history.replace('/dashboard')
        }


      }




        
    




    return(
        <div className="login-container">
            <form className="login-form"  onSubmit={loginHandler}>
             <div className="input-group">
                   
                     <label htmlFor="email">Email:</label>
                      <input  type="email" id="email " required ref={emailRef} ></input>
            </div>
            <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" required ref={passwordRef}></input>
            </div>
            <div className="input-group">
                     <button type="submit"> Login</button>
            </div>             
             </form>       
             {error && <p>{error}</p>}    
                <a href="#">Forgot password</a>
                <p>Don't have an account?<a href="#">SignUp</a></p>
       

        </div>
       
    )


}
export default Login;
