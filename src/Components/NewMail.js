import { useState } from 'react';
import { OverlayTrigger, Overlay, Button,Form } from 'react-bootstrap';
import { EditorState,convertToRaw  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector,useDispatch } from 'react-redux';
import { sendMailData } from '../Pages/Store/DataActions';

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
    const mail={
          sentFrom:sender,
          subject:subject,
          content:content,
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
          
        <Form>
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
      </Form>
          <Editor editorState={editorState} 
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            
          }}
       
          onEditorStateChange={handleEditorChange}
        
           />
        
          <Button onClick={onClose}>Cancel</Button>
          <Button   onClick={submitHandler}>Send</Button>
          
        </div>
      )}
      </OverlayTrigger>

  );
};

export default NewMail;
