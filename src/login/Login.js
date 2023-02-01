import "./Login.css"
import reducer, { initialState } from "../reducer";
import { useStateValue } from "../StateProvider";
import image from "../image/WhatsApp-logo.png"
import { auth, provider } from "../firebase"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import useReducer from "react";



// function Login() {
//     const [state, dispatch] = useReducer(reducer, initialState);
//     console.log(state.user);
//     const signin = () => {
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 //console.log(result.user);
//                 dispatch({ type: "set_user", user: result.user })
//             })
//     }

//     return (
//         <div className="login_page">

//             <div className="login">
//                 <img src={image} />
//                 <h2>Sign in to WhatsApp</h2>
//                 <button onClick={signin}>Login in with Gml</button>

//             </div>
//         </div>
//     )
// }

// export default Login;

function Login() {
    const [{user}, dispatch] = useStateValue();

    const signIn = () => {
        signInWithPopup(auth, provider)
        .then((result)=>{
            //console.log(result.user);
            dispatch({ 
                type: "set_user", 
                user: result.user 
            });
        })
    }

    return (
        <div className="login_page">

            <div className="login">
                <img src={image} />
                <h2>Sign in to WhatsApp</h2>
                <button onClick={signIn}>Login in with Gml</button>
            </div>

        </div>
    );
}

export default Login;

/*

   //import { Button } from '@material-ui/core'
   //import React from 'react'
import { auth, provider } from './firebase';
import "./Login.css"
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {

    const [{}, dispath] = useStateValue();

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then((result) => {
            dispath ({
                type: actionTypes.SET_USER,
                user:result.user,
            });
        })
        .catch((error)=> alert(error.message));
    };

*/