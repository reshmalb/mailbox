import React,{useState} from "react";
import { useRef } from 'react';
import './SignUp.css'

const SignUp =()=>{
   const [email,setEmail]=useState();
   const [password,setPassword]=useState();
   const [confirmPass,setconfirmPass]=useState();
    const [passwordMismatch,setPasswordMismatch]=useState(false)


    const  signupHandler=(event)=>{
        event.preventDefault();
        const user={
            email:email,
            password:password,
            returnSecureToken:true,
        }
    }
       
    const passwordHandler=(e)=>{
        setPassword(e.target.value)
    }
    const confirmPassHandler=(e)=>{
        setconfirmPass(e.target.value)
    }
            if(password!==confirmPass){
                   setPasswordMismatch(true)
              }else{
               setPasswordMismatch(false)
              }



    return(
        <div className="signup-container">
            <  form   onSubmit={signupHandler} className="signup-form">
                
                <div className="input-group">
                         <label htmlFor="email">Email:</label>
                            <input  type="email" id="email " required valueref={email} ></input>
                    
                </div>
                <div className="input-group">
                      <label htmlFor="password">Password:</label>
                        <input type="password" id="password" required value={password} onChange={passwordHandler}></input>
                    
                </div>
              <div className="input-group">
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <input type="password" id="confirmpassword" required value={confirmPass} onChange={confirmPassHandler}></input>
                </div>
           
         

            <div className="input-group button"   >
            <button type="submit">Signup</button>

            </div> 
            {passwordMismatch &&  <p>Enter correct password</p>}
              <p style={{marginTop:"40px",marginLeft:"200px"}}>Have an account?<a href="#">Login</a></p>
        </form>

        </div>
      
    )

}



export default SignUp;