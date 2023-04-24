import React, { useState } from 'react';
import './ComposeMail.css';
import axios from 'axios';

const WEB_API="";
const url=`https://fir-login-aea12-default-rtdb.firebaseio.com/mailbox/`;

const fillSentItems=async(sentitems)=>{
  const emailFrom=localStorage.getItem('email')
    const email=emailFrom.replace('.','')
  try{

    const response=await axios.post(url+`${email}+/sentitems.json`,{
      sentTo:sentitems.sentTo,
      subject:sentitems.subject,
      content:sentitems.content,
    });
    if(response.status===200){
      console.log("data updated in sentitems successfully")
    }

  }catch(error){
    alert(error.message)
  }
}

const ComposeMail = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send mail logic goes a\\here
    console.log(`To: ${to}, Subject: ${subject}, Body: ${body}`);
    const toEmail=to.replaceAll('.','');
    console.log(toEmail)
    const mailbox={
          sendFrom:localStorage.getItem('email'),
          subject:subject,
          content:body,         

    }
    try{
        const response=await axios.post(url+`${toEmail}.json`,mailbox)
         if(response.status==200){
            alert("email send successfully")
            fillSentItems({
              sentTo:to,
              subject:subject,
              content:body,
            })
         }


    }catch(error){
        alert(error)
    }


    // reset form
    setTo('');
    setSubject('');
    setBody('');
  };

  return (
    <div className="compose-mail-container">
      <form onSubmit={handleSubmit} className="compose-mail-form">
        <div className="form-group">
          <label htmlFor="to">To:</label>
          <input
            type="email"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ComposeMail;
