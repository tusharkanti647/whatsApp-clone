import "./Login.css"
import { useStateValue } from "../StateProvider";
import { auth, provider } from "../firebase"
import { db } from "../firebase";

import { signInWithPopup } from "firebase/auth";
import { collection, addDoc, orderBy, query, onSnapshot, setDoc, doc } from "firebase/firestore";

import image from "../image/WhatsApp-logo.png"
import { useNavigate } from "react-router-dom";



function Login() {
    const [{ user }, dispatch] = useStateValue();
    const navigate=useNavigate()

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                //console.log(result.user)
                //console.log(result.user.uid);
                createUserdata(result.user);
                dispatch({
                    type: "set_user",
                    user: result.user
                });

                //this navigate come from useNavigate hook it provite to lonch my application in root("/") page
                navigate("/");
            })
    }

    
    //create and add a group
    //---------------------------------------------------------
    const createUserdata = async (user) => {
        //const group = prompt("plese enter your group name");
        if (user) {
            //console.log(user);
            try {
                const docRef = await setDoc(doc(db, "users", user.uid ), {
                    name: user.displayName,
                    photoUrl: user.photoURL,
                    userUid: user.uid,
                });
                //console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
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