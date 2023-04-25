import React,{useState,useRef} from "react";
import './Login.css'
import axios from "axios";
import { useHistory } from "react-router-dom";
const WEB_API='AIzaSyBmu2iAn2bEUPLR2hBHCQAhknCpMMWjz3o';
const url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API}`;
import { authActions } from "../Pages/Store/AuthStore";
import { useDispatch } from "react-redux";


const Login=()=>{
    const emailRef=useRef();
    const passwordRef=useRef();
    const[error,setError]=useState();
    const history=useHistory();
    const dispatch=useDispatch();
    

    const  loginHandler=async(event)=>{
        event.preventDefault();
        const email=emailRef.current.value;
        const password=passwordRef.current.value;
        const userData={
            email:email,
            password:password,
            returnSecureToken:true}
      try{
        const response= await axios.post(url,userData);
        console.log("response",response)
        console.log("data",response.data)
        console.log("status",response.status)


        if(response.status===200){
            alert("signed in successfully")
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('email',email)
            dispatch(authActions.login({token:response.data.idToken,email:email}))
            history.replace('/dashboard')
        }

      }catch(err){
        if (err.response) {
            // server responded with an error status code (4xx or 5xx)
            setError(err.response.data.error.message);
          } else if (err.request) {
            // no response received
            setError("No response received from server. Please try again later.");
          } else {
            // request failed due to some other reason
            setError("Request failed. Please try again later.");
          }

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
