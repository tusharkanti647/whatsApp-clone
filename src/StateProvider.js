import { createContext, useContext, useReducer } from "react";

//create createContext function for the context API
export const StateContext = createContext()

//create stateProvider for the Context API
export const StateProvider = ({ reducer, initialState, children }) => (
    //context API passes the two thinks the are initial State and dispatch method,
    //they are come ushing reduser hook
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//create a custom hook useStateValue
export const useStateValue = () => useContext(StateContext);