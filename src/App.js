import { createContext, useContext, useReducer } from "react";
import './App.css';
import { stateContext, useStateValue } from "./StateContext";
//import { StateProvider } from './StateContext';

import reducer, { initialState } from './reducer';
import Sidebar from "./sidebar/Sidebar"
import Chat from "./chat/Chat"
//import { db } from "./firebas";
import Login from './login/Login.js';


//import { collection, getDocs } from 'firebase/firestore';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
const [state, dispatch]=useReducer(reducer, initialState);
  //const user = useStateValue(); //chack this
  console.log(state.user);
  
  //const [rooms, setRooms] = useState([]);

  //  useEffect(() => {
  //         db.collection("rooms").onSnapshot(snapshot => {
  //             setRooms(snapshot.docs.map((doc) => {
  //                 //id: doc.id,
  //                 //data: doc.data()
  //                 console.log(doc.data());
  //             }))
  //         })
  //     }, [])


  return (
    <BrowserRouter>
    {/* <StateProvider initialState={initialState} reducer={reducer}> */}
    {/* <stateContext.Provider value={useReducer( initialState,reducer)}> */}
      <div className="app">
          {state.user===null ? (<Login />) : (
          <div className='app_body'>
            <Sidebar />
            <Routes>
              <Route path='/' element={<Chat />}></Route>
              <Route path='/room/:roomId' element={<Chat />}></Route>
            </Routes>
          </div>
         )}
      </div>
      {/* </StateProvider> */}
      {/* </stateContext.Provider> */}
    </BrowserRouter >
  );
}

export default App;
