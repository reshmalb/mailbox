import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import { Container,Row,Col } from 'react-bootstrap';
import Login from './Components/Login';
import { useSelector } from 'react-redux';
import Viewinbox from './Components/Viewinbox';





function App() {

  const isLogin=useSelector((state)=>state.author.isAuthenticated)
  console.log("islogin",isLogin);
       
  return (
    <Fragment>
    <main>  
      {/* <Viewinbox/> */}
      {isLogin  &&  <Route path='/dashboard' exact><Dashboard/> </Route> }

      {!isLogin && <Login/>}     

    </main>
       {/* <Container 
        style={{ backgroundClip :"offwhite",
                display: "flex",
             height:"100vh"}}>
              <Container style={{flexBasis:" 60%",
                           border:"2px",
                            backgroundColor:"white",
                            marginLeft:0,padding:0}}>
                              <h1 style={{marginTop:"4rem",color:"purple"}}>Mail Box</h1>

              </Container>
              <Container style={{flexBasis:" 40%",
                           border:"2px",
                            backgroundColor:"white"}}>
                               
                            {!isLogin &&   <Login/>}
              </Container>
        
        </Container>

  
     
      {isLogin && <Route path='/dashboard'> <Dashboard/> </Route>}
      
     */}
      </Fragment>
    

      
    
  )
}

export default App;
