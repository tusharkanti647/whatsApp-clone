import { useEffect, useState } from "react";


import "./Sidebar.css"
import SidebarChats from "./SidebarChats"

import Avatar from '@mui/material/Avatar';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { Icon, IconButton } from '@mui/material';

import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebas";
import { async } from "@firebase/util";



function Sidebar() {

    const [rooms, setRooms] = useState([]);


    const getRooms = async () => {
        const querySnapshot = await getDocs(collection(db, "rooms"));
        const newArr = [];
        querySnapshot.forEach((doc) => {
            newArr.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        setRooms(newArr);
    }

    useEffect(() => {
        getRooms();
    }, []);


    return (
        <>
            {/* className sidebar is the main containar in left side div */}
            <div className="sidebar">

                <div className="sidebar_header">
                    {/* IconButton component is a inbuild component in the material ui that frovied button like fitures */}
                    <IconButton >
                        <Avatar />
                    </IconButton>

                    {/* classname sidebar_header_right this sidebar heder right part which contains alll icon */}
                    <div className="sidebar_header_right">

                        <IconButton >
                            <DonutLargeIcon />
                        </IconButton>

                        <IconButton >
                            <ChatIcon />
                        </IconButton>

                        <IconButton >
                            <MoreVertIcon />
                        </IconButton>

                    </div>
                </div>

                <div className='sidebar_search'>
                    <div className='sidebar_search_container'>
                        <label htmlFor='search-input'>
                            <IconButton >
                                <SearchIcon />
                            </IconButton>
                        </label>

                        <input type="text" id='search-input' placeholder='search & start a new chat' />
                    </div>
                </div>

                <div className="sidebar_chats">

                    {/* send props addNewChat and render 1st component is add new chat */}
                    <SidebarChats addNewChat={true} />
                    {/* <SidebarChats name="tushar" id="1234" /> // */}
                    
                    {rooms.map((room)=><SidebarChats key={room.id} name={room.name} id={room.id} />)}
                </div>
            </div>
        </>
    )
}

export default Sidebar;