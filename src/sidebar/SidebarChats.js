import { useEffect, useState } from "react";
import "./SidebarChats.css"

import { Avatar } from "@mui/material";

import { collection, addDoc, orderBy, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

import { Link } from "react-router-dom";
//--------------------------------------------------------------------------------------

function SidebarChats(props) {
    const { addNewChat, name, id, photoURL, setIsSearching, setSearchInputValue } = props;
    const [lastMessage, setLastMessage] = useState("");
    const [svgId, setSvgId] = useState("");
    const [messageCount, setMessageCount] = useState(0);

    //console.log(props);

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

                    snapshot.docs.forEach((doc) => {
                        //console.log(doc.data());
                        if (doc.data().isSeen === "false") {

                            //console.log(doc.data().message.inputMessage);
                            // setMessageCount(messageCount + 1);
                            //console.log(messageCount);
                        }
                        setLastMessage(doc.data().message.inputMessage)
                    });
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
                //console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }



    //searchreset this function clear the search input box,
    //and set the state of isSearch is false so that all other chatBar render
    //---------------------------------------------------------
    const searchReset = () => {
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
                    {/* <span>{}</span> */}
                    {/* {console.log("hi")} */}
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