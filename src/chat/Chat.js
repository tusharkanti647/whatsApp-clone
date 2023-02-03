import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import "./Chat.css"
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import { signOut } from "firebase/auth";
import { auth } from '../firebase';

import { Avatar, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";


//-------------------------------------------------------------
function Chat() {
    const [roomeName, setRoomName] = useState("");
    const [inputMessage, setInputMessage] = useState("");
    const [messageArray, setMessageArray] = useState([]);
    const [svgId, setSvgId] = useState("");

    const [{ user }, dispath] = useStateValue();

    //useParams used to get the roomId , when roome is change
    const { roomId } = useParams();

    //-------------------------------------------------------------
    //this useEffect to rendomly find svgId number
    useEffect(() => {
        setSvgId(Math.floor(Math.random() * 5000));
    }, []);


    //-------------------------------------------------------------
    useEffect(() => {
        //this function runs when room change re render the room
        // that time change the roomId, that used get the roome name and set in setroome name
        if (roomId) {
            const getRoomData = onSnapshot(doc(db, "rooms", roomId), (doc) => {
                console.log(doc.data());
                setRoomName(doc.data().name);

            })

            //get all the messge by the time odaring of time when change the roome or roomId
            const q = query(collection(db, "rooms", roomId, "messages"), orderBy("timestam", "asc"))//oder messge on timestamp and ascending oder give the asc

            //set the each room messages in the newMessageArray
            const getMessage = onSnapshot(q, (snapshot) => {
                let newMessageArray = [];
                snapshot.docs.forEach((doc) => newMessageArray.push({ ...doc.data() }));

                setMessageArray(newMessageArray);
            })

        }
    }, [roomId]); //here dependendency array used when roomId chsnge call the useeffect function


    //-----------------------------------------------------------------------
    //when we some messge enter in the messge input filled and enter butten click send Messge firred
    //sendMessage this function add data in the messages sub collection of a each roome,
    // this function add user name each messge and time on which it send, 
    //hhere serverTimestamp functon set the time serverTime
    const sendMessage = async (event) => {
        event.preventDefault();
        if (inputMessage === "") {
            return;
        }

        try {
            const sendData = await addDoc(collection(db, "rooms", roomId, "messages"), {
                message: { inputMessage },
                name: user.displayName,
                timestam: serverTimestamp(),
            })
        } catch (e) {
            console.log("error", e);
        }

        //after take the input value inputmessge creat empty
        setInputMessage("");
    }


    //----------------------------------------------------------------
    return (
        <div className="chat">

            {/* chat header on the part right  side of the chat chat header */}
            {/* ---------------------------------------------------------------- */}
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${svgId}.svg`} />
                <div className="chat_header_info">
                    <h3>{roomeName}</h3>
                    <p>Last seen at{" "} {new Date(messageArray[messageArray.length - 1]?.timestam?.toDate()).toUTCString()}</p>
                </div>

                {/* chat header icons */}
                {/* ---------------------------------------------------------------- */}
                <div className="chat_header_right">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon onClick={() => signOut(auth)} />
                    </IconButton>
                </div>
            </div>

            {/* it is the chat body where messge shows */}
            {/* ------------------------------------------------------------------------------------------------------------------------------ */}
            <div className="chat_body">

                {messageArray.map((eachMessageObj, index) => (
                    <p className={`chat_message ${eachMessageObj.name === user.displayName && "chat_receiver"}`} key={eachMessageObj.timestam} >

                        <span className="chat_name">{eachMessageObj.name}</span>

                        {eachMessageObj.message.inputMessage}
                        <span className="chat_time">
                            {new Date(eachMessageObj.timestam?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}

                {/* <p className="chat_message chat_receiver">
                    <span className="chat_name">Tushar</span>
                    this is test messge .....
                    <span className="chat_time">9:31 AM</span>
                </p> */}
            </div>

            {/* it is chat footer part where type the messge */}
            {/* ------------------------------------------------------------------------------------------------------------------------------ */}
            <div className="chat_footer">
                <IconButton>
                    <SentimentVerySatisfiedIcon />
                </IconButton>

                <IconButton>
                    <AttachFileIcon />
                </IconButton>


                {/* sen messge input box */}
                {/* ---------------------------------------------------------------- */}
                <form onSubmit={(event) => sendMessage(event)}>
                    <input type="text" placeholder="Type a messge" value={inputMessage} onChange={(event) => setInputMessage(event.target.value)} />
                    <input type="submit" />
                </form>

                <IconButton>
                    <KeyboardVoiceIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat;