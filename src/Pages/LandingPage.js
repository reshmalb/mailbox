import React,{useRef} from "react";
import './LandingPage.css'
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";


const LandingPage=()=>{
    return(
       <div className="landingpage-container">
         <div className="left-section">
        <h1>Mail Box</h1>
            <SignUp/>
        </div>       
      
        <div className="middle-section">         

        </div>
       
       
       <div className="right-section">
        
                      {/* <Login/> */}
        </div>

       </div>
     

    )
   
}
export default LandingPage;