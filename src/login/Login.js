import "./Login.css"
import reducer, { initialState } from "../reducer";
import image from "../image/WhatsApp-logo.png"
import { auth, provider } from "../firebas"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useReducer } from "react";



function Login() {
    const [state, dispatch]=useReducer(reducer, initialState);
console.log(state.user);
    const signin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                //console.log(result.user);
                dispatch({type: "set_user", user: result.user})
            })
    }

    return (
        <div className="login_page">

            <div className="login">
                <img src={image} />
                <h2>Sign in to WhatsApp</h2>
                <button onClick={signin}>Login in with Gml</button>
                
            </div>
        </div>
    )
}

export default Login;