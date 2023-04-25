import { useState } from 'react';
import { OverlayTrigger, Overlay, Button,Form } from 'react-bootstrap';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from 'react-redux';

const NewMail = ({ onClose }) => {
  const userMail=useSelector((state)=>state.author.email)  
  const [showOverlay, setShowOverlay] = useState(false);
  const handleOverlay = () => setShowOverlay(!showOverlay);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [email,setEmail]=useState();
  const [subject,setSubject]=useState();

  const handleEditorChange = (state) => setEditorState(state);
  const emailHandler=(e)=>setEmail(e.targret.value);
  const subjectHandler=(e)=>setSubject(e.targret.value);
  const submitHandler=()=>{
    const mail={
          sentFrom:userMail,
          subject:subject,
          content:editorState,
    }
    const toEmail=email.replaceAll('.','')
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
           valur={subject}  
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
