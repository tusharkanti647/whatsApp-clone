
import React, { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Chat from "./chat/Chat";
import { auth } from './firebase';
import Login from './login/Login.js';
import Sidebar from "./sidebar/Sidebar"
import { useStateValue } from "./StateProvider";

// import reducer, { initialState } from './reducer';

//import { BrowserRouter, Routes, Route } from "react-router-dom";
// //import { db } from "./firebas";






function App() {
  //   // const {user} = useStateValue(); 
  //   // console.log(useStateValue());
  const [{ user }, dispath] = useStateValue();

  console.log(user);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispath({
        type: "set_user",
        user: user
      })
    })
  }, [])


  return (



    <BrowserRouter>
      <div className="app">

        {!user ? (<Login />) : (

          <div className='app_body'>


            <Sidebar />
            <Routes>

              <Route path='/' element={<Chat />}>
                
              </Route>

              <Route path='/room/:roomId' element={<Chat />}>
                
              </Route>

            </Routes>
          </div>

        )}
      </div>
    </BrowserRouter>
  )
}

export default App;