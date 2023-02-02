
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import './App.css';
import Chat from "./chat/Chat";
import { auth } from './firebase';
import Login from './login/Login.js';
import Sidebar from "./sidebar/Sidebar"
import { useStateValue } from "./StateProvider";

// import reducer, { initialState } from './reducer';

//import { BrowserRouter, Routes, Route } from "react-router-dom";
// //import { db } from "./firebas";


/*
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import './App.css';
import Chat from './Chat';
import Login from './Login';
import Sidebar from './Sidebar';
import { useStateValue } from './StateProvider';
*/



function App() {
  //   // const {user} = useStateValue(); 
  //   // console.log(useStateValue());
  const [{ user }, dispath] = useStateValue();


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispath({
        type: "set_user",
        user: user
      })
    })
  })


  return (




    <div className="app">

      {!user ? (<Login />) : (

        <div className='app_body'>
          <Router>

            <Sidebar />
            <Switch>

              <Route path='/room/:roomId'>
                <Chat />
              </Route>

              <Route path='/'>
                <Chat />
              </Route>

            </Switch>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App;

/*

function App() {

  const [{ user }, dispath] = useStateValue();

  return (
    // BEM naming convention
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className='app_body'>
          <Router>

            <Sidebar />

            <Switch>
              <Route path='/rooms/:roomId'>
                <Chat />
              </Route>

              <Route path="/">
                <Chat />
              </Route>

            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;

*/