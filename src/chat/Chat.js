import { useEffect, useRef, useState } from "react";

import { useParams, useSearchParams } from "react-router-dom";

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

import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";


//-------------------------------------------------------------
function Chat() {
    const [roomeName, setRoomName] = useState("");
    const [inputMessage, setInputMessage] = useState("");
    const [messageArray, setMessageArray] = useState([]);
    const [svgId, setSvgId] = useState("");
    const [newFriend, setNewFriend] = useState({
        name: "",
        photoUrl: "",
        userUid: "",
    });


    const [{ user }, dispath] = useStateValue();

    const [searchParams, setSearchParams] = useSearchParams();

    //useParams used to get the roomId , when roome is change
    const { roomId } = useParams();
    const group = searchParams.get('group');
    let profilePhotoUrl = "";
    //-------------------------------------------------------------------------------------------

    //console.log(newFriend);

    //-------------------------------------------------------------
    //this useEffect to rendomly find svgId number
    useEffect(() => {
        setSvgId(Math.floor(Math.random() * 5000));
    }, []);

    if (group === "true") {
        profilePhotoUrl = `https://avatars.dicebear.com/api/human/${svgId}.svg`;
    } else {
        profilePhotoUrl = newFriend.photoUrl;
    }


    //-------------------------------------------------------------
    useEffect(() => {
        //const group = searchParams.get('group');

        //this function runs when room change re render the room
        // that time change the roomId, that used get the roome name and set in setroome name
        if (roomId) {
            if (group === "true") {
                const getRoomData = onSnapshot(doc(db, "rooms", roomId), (doc) => {
                    //console.log(doc.data());
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
            } else {
                //console.log(roomId,newFriend);
                //get the chating friend data from firbase
                const getRoomData = onSnapshot(doc(db, "users", roomId), (doc) => {
                    //console.log(doc.data());
                    setRoomName(doc.data().name);
                    setNewFriend({
                        name: doc.data().name,
                        photoUrl: doc.data().photoUrl,
                        userUid: doc.data().userUid,
                    });
                });
                //------------------------------------------------------------------------------


                //const n = newFriend.userUid;
                //geat all messges of the newfriend
                //get all the messge by the time odaring of time when change the roome or roomId
                const q = query(collection(db, "chats", roomId, "messages"), orderBy("timestam", "asc"))//oder messge on timestamp and ascending oder give the asc

                //set the each room messages in the newMessageArray
                const getMessage = onSnapshot(q, (snapshot) => {
                    //let newMessageArray = [];
                    let allMessages = snapshot.docs.map((doc) => doc.data());

                    let newMessageArray = allMessages.filter((eachMessageObj) => (
                        eachMessageObj.senderUserUid === (user.uid || roomId) ||
                        eachMessageObj.receiverUserUid === (user.uid || roomId)
                    ));

                    //console.log(newMessageArray);
                    setMessageArray(newMessageArray);
                })



            }

        }
    }, [roomId]); //here dependendency array used when roomId chsnge call the useeffect function



    //-----------------------------------------------------------------------
    //when we some messge enter in the messge input filled and enter butten click send Messge firred
    //sendMessage this function add data in the messages sub collection of a each roome,
    // this function add user name each messge and time on which it send, 
    //hhere serverTimestamp functon set the time serverTime
    const sendMessage = async (event) => {
        event.preventDefault();
        if (roomId) {
            if (inputMessage === "") {
                return;
            }

            if (group === "true") {

                try {
                    const sendData = await addDoc(collection(db, "rooms", roomId, "messages"), {
                        message: { inputMessage },
                        senderUserUid: user.uid,
                        name: user.displayName,
                        timestam: serverTimestamp(),
                    })
                } catch (e) {
                    console.log("error", e);
                }
            } else {

                let payload = {
                    //name: user.displayName,
                    message: { inputMessage },
                    senderUserUid: user.uid,
                    receiverUserUid: newFriend.userUid,
                    timestam: serverTimestamp(),
                    //isSeen:"",
                    //timeStamp: firebase.firestore.Timestamp.now(),
                };

                //messeage sender messge data
                try {
                    const sendData = await addDoc(collection(db, "chats", newFriend.userUid, "messages"), {
                        ...payload,
                        isSeen: "false",
                    })
                } catch (e) {
                    console.log("error", e);
                }

                //messeage reciver messge data
                try {
                    const sendData = await addDoc(collection(db, "chats", user.uid, "messages"), {
                        ...payload,
                        isSeen: "true",
                    })
                } catch (e) {
                    console.log("error", e);
                }

                //added friend in sender friendList
                try {
                    const sendData = await setDoc(doc(db, "Friendlist", user.uid, "list", newFriend.userUid), {
                        name: newFriend.name,
                        photoUrl: newFriend.photoUrl,
                        userUid: newFriend.userUid,
                        lastMessage: inputMessage,
                    })
                } catch (e) {
                    console.log("error", e);
                }

                //added friend in resiver friendList
                try {
                    const sendData = await setDoc(doc(db, "Friendlist", newFriend.userUid, "list", user.uid), {
                        name: user.displayName,
                        photoUrl: user.photoURL,
                        userUid: user.uid,
                        lastMessage: inputMessage,
                    })
                } catch (e) {
                    console.log("error", e);
                }
            }

            //after take the input value inputmessge creat empty
            setInputMessage("");
        }
    }
    //console.log(user);

    //----------------------------------------------------------------
    return (
        <div className="chat">

            {/* chat header on the part right  side of the chat chat header */}
            {/* ---------------------------------------------------------------- */}
            <div className="chat_header">
                <Avatar src={profilePhotoUrl} />
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
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            {/* it is the chat body where messge shows */}
            {/* ------------------------------------------------------------------------------------------------------------------------------ */}
            <div className="chat_body">

                {messageArray.map((eachMessageObj, index) => (
                    // senderUserUid: user.uid

                    <p className={`chat_message ${eachMessageObj.senderUserUid === user.uid && "chat_receiver"}`} key={eachMessageObj.timestam} >

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