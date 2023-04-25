import React, { Fragment, useEffect, useState } from 'react';
import './Dashboard.css'
import ComposeMail from '../Components/ComposeMail';
import Inbox from '../Components/Inbox';
import Header from './Layout/Header';
import { ListGroup} from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux'
import { fetchMailBox } from './Store/DataActions';
import NewMail from '../Components/NewMail';


function Dashboard() {
  const [isComposeMail,setComposeMail]=useState(false);
  const [isInbox,setInbox]=useState(false)
  const mailboxData=useSelector((state)=>state.mailbox.mailbBox)
  const dispatch=useDispatch();
  const email=useSelector((state)=>state.author.email)
  const newmail=email.replaceAll('.','')
  const [showOverlay, setShowOverlay] = useState(false);
  useEffect(()=>{

    dispatch(fetchMailBox(newmail));
    
  },[dispatch])


  // useEffect(()=>{
  //   dispatch(fetchMailBox())
  // },[mailboxData,dispatch])
  
 


  const composeMailHandler=()=>{
    setShowOverlay(true);
    // setComposeMail(true)
    // setInbox(false)
  }
  const inboxHandler=()=>{
    setInbox(true)
    setComposeMail(false)

  }
  const sentItemsHandler=()=>{

  }
  const draftHandler=()=>{
    
  }
  const trashHandler=()=>{
    
  }

  return (
    <Fragment>
      <Header/>
      <main>
      <Container  style={{display:"flex",      
           marginBottom:"10px",
           marginLeft:"1px",
          flexBasis:'20%',
       }}
           >

    
      <ListGroup ListGroup className="horizontal-sm" 
      style={{display: 'flex', 
      justifyContent: 'flex-start',
       width: '200px',
       height:'100%',
       marginTop:'3rem',
       border:"none",
       marginLeft:"1px"}}>   

      <ListGroup.Item action variant="light" onClick={composeMailHandler}>+Create New Mail
      </ListGroup.Item>
      <ListGroup.Item action variant="light" onClick={inboxHandler}>Inbox
       <span className='justify-content-end'>10</span>
      </ListGroup.Item>
      <ListGroup.Item action variant="light" onClick={sentItemsHandler}>Sent
      </ListGroup.Item>
      <ListGroup.Item action variant="light" onClick={draftHandler} >Drafts
      </ListGroup.Item>
      <ListGroup.Item action variant="light" onClick={trashHandler}>Trash
      </ListGroup.Item>
    
    
    
    </ListGroup>
 






      {/* <div className="container">
     <div className="sidebar"><ul>
        <li ><button onClick={inboxHandler} >Inbox </button></li>
        <li>Sent</li>
        <li>Drafts</li>
        <li>Spam</li>
        <li>Trash</li>
      </ul> */}


    
     {/* </div> */}
   
   
{/*  
    </div> */}
     </Container>
     <Container  style={{displsy:"flex",      
           marginBottom:"10px",
           marginRight:"1px",
          flexBasis:'80%',
          border:'1px'
       }}
       >
              <div className="main-content">

                {showOverlay && (<NewMail onClose={() => setShowOverlay(false)} />)}
                  {/* {isInbox && <Inbox/>} */}
              </div>

       </Container>
      </main>
      
    </Fragment>
    
  
  );
}

export default Dashboard;
