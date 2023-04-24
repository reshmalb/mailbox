import React, { useEffect, useState } from "react";
import axios from "axios";
const url=`https://fir-login-aea12-default-rtdb.firebaseio.com/mailbox/`;
const Inbox =()=>{
    const [inbox,setInbox]=useState([])
    const [email,setEmail]=useState(localStorage.getItem('email'))
    const fromEmail=email.replace('.','');
    useEffect(()=>{
        fetchMailbox();
        
    },[])
    const fetchMailbox=async()=>{
        try{
            const response=await axios.get(url+`${fromEmail}.json`);
            if(response.data){
                console.log("response inbox",response.data)
                const mydata=Object.keys(response.data).map((key)=>
                {  return response.data[key]})
                console.log("mydata",mydata)
                setInbox(mydata)
            }
            console.log("inbox",inbox)
            

        }catch(error){
            alert("error")

        }
    }


    return(
        <div>
            {inbox.map((item)=>{
                return(<ul>
                    <li>{item.sendFrom}</li>
                    <li>{item.subject}</li>
                    <li>{item.content}</li>

                </ul>)
           })}

        </div>
    )
    
}

export default Inbox;