import React,{useState} from "react";
import axios  from 'axios'
import './SignUp.css'
const WEB_API='AIzaSyBmu2iAn2bEUPLR2hBHCQAhknCpMMWjz3o';
const url=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${WEB_API}`

const SignUp =()=>{
   const [email,setEmail]=useState();
   const [password,setPassword]=useState();
   const [confirmPass,setconfirmPass]=useState();
    const [passwordMismatch,setPasswordMismatch]=useState(false)


    const  signupHandler=(event)=>{
        event.preventDefault();
        if(password!==confirmPass){
            alert("Enter correct password");
            setPassword("");
            setconfirmPass("");
            return;
        }
        const user={
            email:email,
            password:password,
            returnSecureToken:true,
        }
  axios.post(url, user)
  .then(response => {
    console.log(response.data);
  
    alert('Account created successfully!');
  })
  .catch(error => {
    console.log(error.response);
    if (error.response.data.error.message === 'EMAIL_EXISTS') {
      alert('This email is already in use. Please use a different email address.');
    } else if (error.response.data.error.message === 'INVALID_EMAIL') {
      alert('Please enter a valid email address.');
    } else if (error.response.data.error.message === 'WEAK_PASSWORD : Password should be at least 6 characters') {
      alert('Please enter a password that is at least 6 characters long.');
    } else {
      alert('An error occurred. Please try again later.');
    }
  });
    }

    const emailChangeHandler=(e)=>{
        setEmail(e.target.value)
    }
       
    const passwordHandler=(e)=>{
        setPassword(e.target.value)
    }
    const confirmPassHandler=(e)=>{
        setconfirmPass(e.target.value)
    }
          



    return(
        <div className="signup-container">
            <  form   onSubmit={signupHandler} className="signup-form">
                
                <div className="input-group">
                         <label htmlFor="email">Email:</label>
                            <input  type="email" id="email "
                             required valueref={email} 
                             onChange={emailChangeHandler} ></input>
                    
                </div>
                <div className="input-group">
                      <label htmlFor="password">Password:</label>
                        <input type="password" id="password"
                         required value={password} 
                         onChange={passwordHandler}></input>
                    
                </div>
              <div className="input-group">
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <input type="password" id="confirmpassword"
                     required value={confirmPass}
                      onChange={confirmPassHandler}></input>
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