import { createContext, useContext, useReducer } from "react";
import './App.css';
import {  StateProvider, useStateValue } from "./StateContext";

import reducer, { initialState } from './reducer';
import Sidebar from "./sidebar/Sidebar"
import Chat from "./chat/Chat"
//import { db } from "./firebas";
import Login from './login/Login.js';


import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const {user} = useStateValue(); 
  console.log(useStateValue());




  return (
    <BrowserRouter>
      <StateProvider>
        {/* {console.log(reducer)} */}
        {/* <StateContext.Provider value={useReducer( initialState,reducer)}>  <Login />   */}
        <div className="app">
        
          {!user ? (<Login />) : (
            
            <div className='app_body'>
              
              <Sidebar />
              <Routes>
                <Route path='/' element={<Chat />}></Route>
                <Route path='/room/:roomId' element={<Chat />}></Route>
              </Routes>
            </div>
          )}
        </div>
      </StateProvider>
      {/* </StateContext.Provider> */}
    </BrowserRouter >
  );
}

export default App;
