import "./Login.css"
import { useStateValue } from "../StateProvider";
import { auth, provider } from "../firebase"

import { signInWithPopup } from "firebase/auth";

import image from "../image/WhatsApp-logo.png"



function Login() {
    const [{ user }, dispatch] = useStateValue();

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                //console.log(result.user);
                dispatch({
                    type: "set_user",
                    user: result.user
                });
            })
    }

    

    //-------------------------------------------------------------
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