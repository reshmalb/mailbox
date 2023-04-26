
import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';

function Drafts() {
  const emails=useSelector((state)=>state.mailbox.mailBox)
  const sent=emails.sentItems||[];
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

  return (
    <ListGroup style={{  marginTop: '5rem',width:'100%'}}>
      {sent.map(email => (
        <ListGroup.Item key={email.id} action onClick={() => handleEmailClick(email)}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{email.sentTo}</h5>
            {/* <small>{email.date}</small> */}
          </div>
          <p className="mb-1">{email.content.slice(0, 50)}...</p>
          <small>{email.subject}</small>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Drafts;
