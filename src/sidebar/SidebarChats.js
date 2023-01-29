import "./SidebarChats.css"

import { Avatar } from "@mui/material";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebas";


function SidebarChats(props) {
    const {addNewChat, name, id } = props;
    //console.log(props);

    const createChat = async () => {
        const group = prompt("plese enter your group name");
        if (group) {
            try {
                const docRef = await addDoc(collection(db, "rooms"), {
                    name: group,
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }

    return (
        !addNewChat ? (
            <div className="sidebar_chat">
                <Avatar className="avatar" />
                <div className="sidebar_chat_info">
                    <h2>{name}</h2>
                    <p>last messge.....</p>
                </div>
            </div>
        ) : (
            (
                <h2 onClick={createChat} className="addNewChat_bar">Add New Chat</h2 >
            )
        )
    )
}

export default SidebarChats;