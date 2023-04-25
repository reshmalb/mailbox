import ListGroup from 'react-bootstrap/ListGroup';

function Viewinbox() {
  
    const alertClicked = () => {
        alert('You clicked the third ListGroupItem');
      };
    
      return (
        <ListGroup defaultActiveKey="#link1">
         
              
          <ListGroup.Item action onClick={alertClicked}>
            This one is a button
          </ListGroup.Item>
        </ListGroup>
      );
    }


export default Viewinbox;