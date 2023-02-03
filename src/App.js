
import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';

import Chat from "./chat/Chat";
import Chat_1stPage from "./chat/Chat_1stPage"
import { auth } from './firebase';
import Login from './login/Login.js';
import Sidebar from "./sidebar/Sidebar"
import { useStateValue } from "./StateProvider";

//-------------------------------------------------------------
function App() {
  //get user and dispatch function from context API
  //and createContext are called by ushing useStateValue() custome hooks
  const [{ user }, dispath] = useStateValue();
  // console.log(useStateValue());

  //if user login the application, after the refresh the page,
  //thay can be atometic log in application 
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      //change the state ushing reduser, fire the dispath.
      dispath({
        type: "set_user",
        user: user
      })
    })
  }, [])


  //-------------------------------------------------------------
  return (

    <BrowserRouter>
      <div className="app">

        {!user ? (<Login />) : (
          <div className='app_body'>
            <Sidebar />

            <Routes>
              <Route path='/' element={<Chat_1stPage />}></Route>
              <Route path='/room/:roomId' element={<Chat />}></Route>
            </Routes>

          </div>
        )}

      </div>
    </BrowserRouter>
  )
}

export default App;