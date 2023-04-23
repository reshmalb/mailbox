import logo from './logo.svg';
import './App.css';

import { Fragment } from 'react';
import LandingPage from './Pages/LandingPage';
import { Route } from 'react-router-dom';
import DummyScreen from './Pages/DummyPage';


function App() {
  return (
    <Fragment>
      <LandingPage/>
      <Route path='/dummy'><DummyScreen/></Route>
      
      </Fragment>
    

      
    
  )
}

export default App;
