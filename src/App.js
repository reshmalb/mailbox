import logo from './logo.svg';
import './App.css';

import { Fragment } from 'react';
import LandingPage from './Pages/LandingPage';
import { Route } from 'react-router-dom';
import DummyScreen from './Pages/DummyPage';
import ComposeMail from './Components/ComposeMail';
import Dashboard from './Pages/Dashboard';


function App() {

    const isLogin=localStorage.getItem('token')
  return (
    <Fragment>
      {/* <LandingPage/> */}
      {/* <Route path='/dummy'><DummyScreen/></Route> */}
      {isLogin &&<Route path='/dashboard'><Dashboard/></Route>}
      {!isLogin&& <LandingPage/>}
      
      </Fragment>
    

      
    
  )
}

export default App;
