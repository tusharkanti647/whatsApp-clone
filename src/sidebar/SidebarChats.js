import "./SidebarChats.css"

import { Avatar } from "@mui/material";

// const SidebarEachChats = () => {
//     return (<>

//     </>)
// }

function SidebarChats(props) {
    const { addNewChat } = props;

    return (
        !addNewChat ? (
            <div className="sidebar_chat">
                <Avatar className="avatar"/>
                <div className="sidebar_chat_info">
                    <h2>Tusghar</h2>
                    <p>last messge.....</p>
                </div>
            </div>
        ) : (
            <h2 className="addNewChat_bar">Add New Chat</h2 >
        )
    )
}

export default SidebarChats;