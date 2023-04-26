// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const url=`https://fir-login-aea12-default-rtdb.firebaseio.com/mailbox/`;
// const Inbox =()=>{
//     const [inbox,setInbox]=useState([])
//     const [email,setEmail]=useState(localStorage.getItem('email'))
//     const fromEmail=email.replace('.','');
//     useEffect(()=>{
//         fetchMailbox();
        
//     },[])
//     const fetchMailbox=async()=>{
//         try{
//             const response=await axios.get(url+`${fromEmail}.json`);
//             if(response.data){
//                 console.log("response inbox",response.data)
//                 const mydata=Object.keys(response.data).map((key)=>
//                 {  return response.data[key]})
//                 console.log("mydata",mydata)
//                 setInbox(mydata)
//             }
//             console.log("inbox",inbox)
            

//         }catch(error){
//             alert("error")

//         }
//     }


//     return(
//         <div>
//             {inbox.map((item)=>{
//                 return(<ul>
//                     <li>{item.sendFrom}</li>
//                     <li>{item.subject}</li>
//                     <li>{item.content}</li>

//                 </ul>)
//            })}

//         </div>
//     )
    
// }

// export default Inbox;

import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

function Inbox() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const emails = [
    {
      id: 1,
      subject: 'Meeting next week',
      sender: 'John Doe',
      date: '2022-04-25',
      content: 'Hi there, we have a meeting scheduled for next week. Are you available to attend?',
    },
    {
      id: 2,
      subject: 'New project proposal',
      sender: 'Jane Smith',
      date: '2022-04-24',
      content: 'Hello, I have a new project proposal that I would like to discuss with you. Let me know if you are interested.',
    },
    // add more email objects here...
  ];

  function handleEmailClick(email) {
    setSelectedEmail(email);
  }

  function handleBackClick() {
    setSelectedEmail(null);
  }

  if (selectedEmail) {
    return (
      <div style={{  marginTop: '5rem'}}>
        <button onClick={handleBackClick}>Back to list</button>
        <h2>{selectedEmail.subject}</h2>
        <p>From: {selectedEmail.sender}</p>
        <p>Date: {selectedEmail.date}</p>
        <p>{selectedEmail.content}</p>
      </div>
    );
  }

  return (
    <ListGroup style={{  marginTop: '5rem',width:'100%'}}>
      {emails.map(email => (
        <ListGroup.Item key={email.id} action onClick={() => handleEmailClick(email)}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{email.subject}</h5>
            <small>{email.date}</small>
          </div>
          <p className="mb-1">{email.content.slice(0, 50)}...</p>
          <small>{email.sender}</small>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Inbox;
