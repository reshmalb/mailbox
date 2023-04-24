import React, { useState } from "react";
const url=`https://fir-login-aea12-default-rtdb.firebaseio.com/mailbox/`;

const SentItems=()=>{
    const [sentitems,setSentItems]=useState([])
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
                setSentItems(mydata)
            }
            console.log("inbox",inbox)
            

        }catch(error){
            alert("error")

        }
    }
        return(
            <div>
                <ul>
                    <li>SendTo:
                    Subject:
                    content:       
                    </li>

                </ul>
            </div>
        )

}
export default SentItems;