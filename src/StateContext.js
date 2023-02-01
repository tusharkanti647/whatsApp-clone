import { createContext, useContext, useReducer } from "react";
import reducer, { initialState } from './reducer';

 const StateContext=createContext()

 const StateProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);

     <StateContext.Provider value={state}>
        {children}
     </StateContext.Provider>
}

const useStateValue =()=>useContext(StateContext);

export {StateProvider, useStateValue}