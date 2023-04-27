
import React, { useState } from 'react';
import { ListGroup,Button } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { deleteData, deleteSentItems } from '../Pages/Store/DataActions';

function SentItems() {
  const emails=useSelector((state)=>state.mailbox.mailBox)
  const sent=emails.sentItems||[];
  
  const email=useSelector((state)=>state.author.email)
  const dispatch=useDispatch();

  console.log("inbox",sent)
  console.log("emails",emails)

  const [selectedEmail, setSelectedEmail] = useState(null);
 

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
        <p>To: {selectedEmail.sentTo}</p>
        {/* <p>Date: {selectedEmail.date}</p> */}
        <p>{selectedEmail.content}</p>
      </div>
    );
  }
  const deleteEmailHandler=(id,event)=>{
    event.stopPropagation();
    console.log("id",id);
    dispatch(deleteSentItems(id,email))

  }
  return (
    <ListGroup style={{  marginTop: '5rem',width:'100%'}}>
      {sent.map(email => (
        <ListGroup.Item key={email.id} action onClick={() => handleEmailClick(email)}>
          <div className="d-flex w-100 justify-content-between">
            <h6 className="mb-1">{email.sentTo}</h6>
            <p className="mb-1">{email.content.slice(0, 50)}...</p>
          <small>{email.subject}</small>
          <small className='mb-1'>{email.date}</small> 
          <small className='mb-1'>{email.time}</small> 
         
          </div>
          <Button className="d-flex justify-content-between"
           variant="danger" size="sm"
            onClick={(event)=> deleteEmailHandler(email.id, event)}>Delete</Button>
         
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default SentItems;
