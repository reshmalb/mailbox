import React,{useState,useRef} from "react";
import './Login.css'


const Login=()=>{
    const emailRef=useRef();
    const passwordRef=useRef();

    const  loginHandler=(event)=>{
        event.preventDefault();
        const email=emailRef.current.value;
        const password=passwordRef.current.value;
        if(email||password!==''){

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
             <div className="input-group">
                <a href="#">Forgot password</a>
                <p>Don't have an account?<a href="#">SignUp</a></p>
             </div>         

        </div>
       
    )


}
export default Login;
