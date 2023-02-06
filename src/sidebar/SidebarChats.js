import { useEffect, useState } from "react";
import "./SidebarChats.css"

import { Avatar } from "@mui/material";

import { collection, addDoc, orderBy, query, onSnapshot, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

import { Link, useParams } from "react-router-dom";
import { useStateValue } from "../StateProvider";
//--------------------------------------------------------------------------------------

function SidebarChats(props) {
    //console.log(props);
    const { addNewChat, name, id, photoURL, setIsSearching, setSearchInputValue } = props;
    const [lastMessage, setLastMessage] = useState("");
    const [svgId, setSvgId] = useState("");
    const [messageCount, setMessageCount] = useState(0);
    const [{ user }, dispath] = useStateValue();
    const [finalfalseMessageArray, setFinalfalseMessageArray] = useState([]);


    let profilePhotoUrl = "";
    let linkToUrl = "";

    //--------------------------------------------------------------------------------

    //set the profile Photo Url and link To Url
    if (photoURL) {
        profilePhotoUrl = photoURL;
        linkToUrl = `room/${id}?group=${false}`
    } else {
        profilePhotoUrl = `https://avatars.dicebear.com/api/human/${svgId}.svg`;
        linkToUrl = `room/${id}?group=${true}`
    }

    useEffect(() => {
        setSvgId(Math.floor(Math.random() * 5000));
    }, []);

    //------------------------------------------------------------------------

    useEffect(() => {
        //this function runs when room change re render the room
        // that time change the roomId, that used get the roome name and set in setroome name
        if (id) {
            if (!photoURL) {
                //get all themessge by the time odering of time when chnge the roome or roomId
                const q = query(collection(db, "rooms", id, "messages"), orderBy("timestam", "asc"))//oder messge on timestamp and ascending oder give the asc

                const getMessage = onSnapshot(q, (snapshot) => {

                    snapshot.docs.forEach((doc) => setLastMessage(doc.data().message.inputMessage));
                })
            } else {
                const q = query(collection(db, "chats", id, "messages"), orderBy("timestam", "asc"))//oder messge on timestamp and ascending oder give the asc

                const getMessage = onSnapshot(q, (snapshot) => {

                    let allMessages = [];
                    snapshot.docs.forEach((doc) => allMessages.push({ id: doc.id, ...doc.data() }));

                    //if(id===)
                    //filter the messge sender and resiver conversession messge
                    let newMessageArray = allMessages.filter((eachMessageObj) => (
                        eachMessageObj.senderUserUid === (user.uid || id) ||
                        eachMessageObj.receiverUserUid === (user.uid || id)
                    ));

                    let falseMessageArray = newMessageArray.filter((eachMessageObj) => (
                        eachMessageObj.isSeen === "true"
                    ))
                    setFinalfalseMessageArray(falseMessageArray);;
                    //console.log(finalfalseMessageArray);

                    setLastMessage(newMessageArray[newMessageArray.length - 1].message.inputMessage);
                    setMessageCount(falseMessageArray.length);
                })
            }
        }
    }, [id]);

    //create and add a group
    //---------------------------------------------------------
    const createChat = async () => {
        const group = prompt("plese enter your group name");
        if (group) {
            try {
                const docRef = await addDoc(collection(db, "rooms"), {
                    name: group,
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }



    //searchreset this function clear the search input box,
    //and set the state of isSearch is false so that all other chatBar render
    //set the all unseen message to seen
    //---------------------------------------------------------
    const searchReset = () => {

        const changeChat = async (chatObj) => {
            //console.log(chatObj);
            if (chatObj) {
                try {
                    const docRef = await setDoc(doc(db, "chats", id, "messages", chatObj.id), {
                        ...chatObj,
                        isSeen: "false",
                    });
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
        }
        finalfalseMessageArray.map((eachMessageObj) => changeChat(eachMessageObj));



        if (!photoURL) {
            return;
        }
        setIsSearching(false);
        setSearchInputValue("");
    }

    //--------------------------------------------------------------------
    return (
        !addNewChat ? (
            <Link to={linkToUrl}>
                <div className="sidebar_chat" onClick={searchReset}>
                    <Avatar src={profilePhotoUrl} className="avatar" />
                    <div className="sidebar_chat_info">
                        <h2>{name}</h2>
                        <p>{lastMessage}</p>
                    </div>
                    {messageCount > 0 ? <span>{messageCount}</span> : ""}
                </div>
            </Link>
        ) : (
            (
                <h2 onClick={createChat} className="addNewChat_bar">Add New Chat</h2 >
            )
        )
    )
}

export default SidebarChats;