import { useEffect, useState } from "react";
import "./SidebarChats.css"

import { Avatar } from "@mui/material";

import { collection, addDoc, orderBy, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

import { Link } from "react-router-dom";


function SidebarChats(props) {
    const { addNewChat, name, id } = props;
    const [lastMessage, setLastMessage] = useState("");
    //console.log(props);

    useEffect(() => {
        //this function runs when room change re render the room
        // that time change the roomId, that used get the roome name and set in setroome name
        if (id) {
            //get all themessge by the time odering of time when chnge the roome or roomId
            const q = query(collection(db, "rooms", id, "messages"), orderBy("timestam", "asc"))//oder messge on timestamp and ascending oder give the asc

            const getMessage = onSnapshot(q, (snapshot) => {

                snapshot.docs.forEach((doc) => setLastMessage(doc.data().message.inputMessage));
            })
        }
    }, [id]);

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

        // return ()=>{
        
        // }
    }

    return (
        !addNewChat ? (
            <Link to={`room/${id}`}>
                <div className="sidebar_chat">
                    <Avatar className="avatar" />
                    <div className="sidebar_chat_info">
                        <h2>{name}</h2>
                        <p>{lastMessage}</p>
                    </div>
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