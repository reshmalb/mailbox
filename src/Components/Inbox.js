
import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { deleteData, updateReadEmails } from '../Pages/Store/DataActions';

import {Badge, OverlayTrigger,Tooltip }from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function Inbox() {
  const emails=useSelector((state)=>state.mailbox.mailBox)
  const email=useSelector((state)=>state.author.email)
  const inbox=emails.inbox||[];
  console.log("inbox",inbox)
  console.log("emails",emails)
  const dispatch=useDispatch();

  const [selectedEmail, setSelectedEmail] = useState(null);
 

  function handleEmailClick(email) {
    setSelectedEmail(email);
  }

  function handleBackClick() {
    setSelectedEmail(null);
  }
  const deleteEmailHandler=(id,event)=>{
    event.stopPropagation();
    console.log("id",id);
    dispatch(deleteData(id,email))

  }

  if (selectedEmail) { 
       if(selectedEmail.isRead===false){
        const updatedMail={                   
          ...selectedEmail,
          isRead:true,                    
        }
        console.log("updatedmail",updatedMail);
        dispatch( updateReadEmails(selectedEmail.id,email,updatedMail))

       }
      
                     
    
    return (
      <div style={{  marginTop: '5rem'}}>
        <button onClick={handleBackClick}>Back to list</button>
        <h2>{selectedEmail.subject}</h2>
        <p>From: {selectedEmail.sentFrom}</p>
        <p>Date: {selectedEmail.date}</p>
        <p>{selectedEmail.content}</p>
      </div>
    );
  }

  return (
    <ListGroup style={{  marginTop: '5rem',width:'100%'}}>
      {inbox.map(email => (
        <ListGroup.Item key={email.id} action onClick={() => handleEmailClick(email)}>
          {!email.isRead && <>
          <div className="d-flex w-100 justify-content-between" style={{fontWeight:"bold"}}>
          <Badge pill variant="danger"
           style={{ position: 'absolute', 
           top: '0px', 
           margin:0,
           padding:0,
          
            width: '8px', 
            height: '8px',
             fontSize: '0.3rem',
             color:"blue" }}>.
          
        </Badge> <p className="mb-1">{email.subject}</p>
           <p className="mb-1" style={{fontWeight:"bold"}}>{email.content.slice(0, 50)}...</p>
             <small className='mb-1'>{email.date}</small> 
             <small className='mb-1'>{email.time}</small> 

             
             </div>
         
        
         
          
          <small style={{fontWeight:"bold"}}>{email.sentFrom}</small>
          </>}
          {email.isRead && <>
          <div className="d-flex w-100 justify-content-between" >
           <p className="mb-1">{email.subject}</p>
           <p className="mb-1">{email.content.slice(0, 50)}...</p>
             <small className='mb-1'>{email.date}</small> 
             <small className='mb-1'>{email.time}</small> 
           
             </div>
         
         
         
          <small >{email.sentFrom}</small>
          </>}
          <Button className="d-flex w-100 justify-content-between" variant="danger" size="sm" onClick={(event)=> deleteEmailHandler(email.id, event)}>Delete</Button>

         
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Inbox;
