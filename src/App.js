import logo from './logo.svg';
import './App.css';

import { Fragment } from 'react';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import SignUp from './Components/SignUp';


function App() {
  return (
    <Fragment>
      <div className="landingpage-container">
         <div className="left-section">
        <h1>Mail Box</h1>
            <SignUp/>
        </div>       
      
        <div className="middle-section">         

        </div>
       
       
       <div className="right-section">
        
                      {/* <Login/> */}
        </div>

       </div>
     

      
      </Fragment>
    

      
    
  )
}

export default App;
