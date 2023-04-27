import React, { Fragment, useEffect, useState } from 'react';
import './Dashboard.css'
import Inbox from '../Components/Inbox';
import Header from './Layout/Header';
import { ListGroup} from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux'
import { fetchMailBox } from './Store/DataActions';
import NewMail from '../Components/NewMail';
import SentItems from '../Components/SentItems';
import Drafts from '../Components/Drafts';
let initailFetch=true;

function Dashboard() {
  const [isComposeMail,setComposeMail]=useState(false);
  const [isInbox,setInbox]=useState(false)
  const  [isSentItems,setSentItems]=useState(false);
  const  [isDrafs,setDrafts]=useState(false);
  const unread=useSelector((state)=>state.mailbox.unreadEmails)
  const isChanged=useSelector((state)=>state.mailbox.isChange)




  const mailboxData=useSelector((state)=>state.mailbox.mailbBox)
  const dispatch=useDispatch();
  const email=useSelector((state)=>state.author.email)
  const newmail=email.replaceAll('.','')
  const [showOverlay, setShowOverlay] = useState(false);
  useEffect(()=>{
   
    dispatch(fetchMailBox(newmail));
   
  },[dispatch])


  useEffect(()=>{
    if(initailFetch){
      initailFetch=false;
      return;
    }
    if(isChanged){
    dispatch(fetchMailBox(newmail))

    }
  },[mailboxData,dispatch])
  
 


  const composeMailHandler=()=>{
    setShowOverlay(true);
    // setComposeMail(true)
    // setInbox(false)
  }
  const inboxHandler=()=>{
    setInbox(true)
    setShowOverlay(false)
    setSentItems(false);
    setDrafts(false)

  }
  const sentItemsHandler=()=>{
    setSentItems(true);
    setInbox(false);
    setShowOverlay(false);
    setDrafts(false);

  }
  const draftHandler=()=>{
    setInbox(false)
    setShowOverlay(false)
    setSentItems(false);
    setDrafts(true)
  }
  const trashHandler=()=>{
    
  }

 
    return (
      <>
        <Header />
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '10px',
              marginLeft: '1px',
              flexBasis: '20%',
              backgroundColor: 'whitesmoke',
              height: '100vh',
              maxWidth: '300px',
            }}
          >
            <ListGroup
              className="horizontal-sm"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                height: '100%',
                marginTop: '4rem',
                border: 'none',
                marginLeft: '1px',
              }}
            >
              <ListGroup.Item action variant="light" onClick={composeMailHandler}>
                +Create New Mail
              </ListGroup.Item>
              <ListGroup.Item action variant="light" onClick={inboxHandler}>
                Inbox
                <span className="justify-content-end" style={{color:"red"}}>{unread>0 ?`(unread${"  "}${unread})`:'no new mails'}</span>
              </ListGroup.Item>
              <ListGroup.Item action variant="light" onClick={sentItemsHandler}>
                Sent
              </ListGroup.Item>
              <ListGroup.Item action variant="light" onClick={draftHandler}>
                Drafts
              </ListGroup.Item>
              <ListGroup.Item action variant="light" onClick={trashHandler}>
                Trash
              </ListGroup.Item>
            </ListGroup>
          </div>
    
          <div
            style={{
              display: 'flex',
              marginRight: '1px',
              border: '1px',
              marginLeft: '2rem',
              marginTop:0,
            
              borderRadius: '20px',
              backgroundColor: 'whitesmoke',
              width:"100%"
            }}
          >
            {showOverlay && <NewMail onClose={() => setShowOverlay(false)} />}
            {isInbox && <Inbox />}
            {isDrafs&& <Drafts/>}
            {isSentItems &&<SentItems/>}
          </div>
        </div>
      </>
    );
    

}

export default Dashboard;
