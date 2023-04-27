import { useState } from 'react';
import { OverlayTrigger, Overlay, Button,Form } from 'react-bootstrap';
import { EditorState,convertToRaw  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector,useDispatch } from 'react-redux';
import { sendMailData } from '../Pages/Store/DataActions';
import './NewMail.css'

const NewMail = ({ onClose }) => {
  const sender=useSelector((state)=>state.author.email)  
  const [showOverlay, setShowOverlay] = useState(false);
  const handleOverlay = () => setShowOverlay(!showOverlay);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [content,setContent]=useState('');
  const [email,setEmail]=useState('');
  const [subject,setSubject]=useState('');
  const dispatch=useDispatch();

  const handleEditorChange = (state) =>{
       setEditorState(state);
       const contentState = editorState.getCurrentContent();
       const plainText = contentState.getPlainText();
       console.log(plainText);
       setContent(plainText)
  }
  const emailHandler=(e)=>{
    setEmail(e.target.value);
  }
  const subjectHandler=(e)=>{
    setSubject(e.target.value);
  }
 
  const submitHandler=()=>{
    const currentDate = new Date();
     const formattedDate = `${currentDate.toLocaleDateString()}`
      const formattedTime=` ${currentDate.toLocaleTimeString()}`;
 

    const mail={
          sentFrom:sender,
          subject:subject,
          content:content,
          isRead:false,
          date:formattedDate,
          time:formattedTime,
    }
   
    dispatch(sendMailData(mail,email))

  }


  return (
    <OverlayTrigger
      show={showOverlay}
      onHide={onClose}
      placement="bottom"
      transition={false}
      position="fixed"
      
    >
      {({ placement, arrowProps, show: _show, popper, ...props }) => (
        <div
          {...props}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            height: '300px',
            marginTop:"5px"
          }}
        > 
          
        <Form style={{background:"white"}}>
        <Form.Group controlId="sentTo">
          <Form.Label>Sent To</Form.Label>
          <Form.Control type="email"
           placeholder="Enter email" 
           value={email}
           onChange={emailHandler}/>
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text"
           placeholder="Enter subject"
           value={subject}  
           onChange={subjectHandler}/>
        </Form.Group>
        <Editor editorState={editorState} 
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            
          }}
       
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        
           />
       
      </Form>   
      <div className="button-group">
        <Button className="send-button" onClick={submitHandler}>Send</Button>
        <Button className="cancel-button" onClick={onClose}>Cancel</Button>
      </div>          
   </div>
      )}
            
      </OverlayTrigger>

  );
};

export default NewMail;
