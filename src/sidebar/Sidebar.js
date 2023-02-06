import { useEffect, useState } from "react";

import "./Sidebar.css"
import SidebarChats from "./SidebarChats"
import { db } from "../firebase";


import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from '../firebase';


import Avatar from '@mui/material/Avatar';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';//Icon
import { useStateValue } from "../StateProvider";





function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [searchResultUsers, setSearchResultUsers] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const [{ user }, dispath] = useStateValue();

    //get the all rooms form firstore and add in the rooms array
    //---------------------------------------------------------------------------------------
    //console.log(user);
    const getRooms = async () => {
        const getData = onSnapshot(collection(db, "rooms"), (snapshot) => {
            const newArr = [];
            snapshot.docs.forEach((doc) => {
                newArr.push({
                    id: doc.id,
                    ...doc.data(),
                });
                setRooms(newArr);
            })
        })
    }
    //---------------------------------------------------------------------------------------

    //get all user from user collection
    const getAllUsers = async () => {
        const getData = onSnapshot(collection(db, "users"), (snapshot) => {
            const newArr = [];
            snapshot.docs.filter((doc) => {
                //console.log(doc.id, user.userUid);
                if (doc.id != user.uid) {
                    newArr.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                    setAllUsers(newArr);
                }
            })
        })
    }
    //---------------------------------------------------------------------------------------

    //get all friendList of current user from friendlist collection
    const getAllFriendList = async () => {
        const getData = onSnapshot(collection(db, "Friendlist", user.uid, "list"), (snapshot) => {
            const newArr = [];
            snapshot.docs.forEach((doc) => {
                newArr.push({
                    ...doc.data(),
                });
                setFriendList(newArr);
            })
        })
    }

    //---------------------------------------------------------------------------------------
    useEffect(() => {
        getRooms();
        getAllUsers();
        getAllFriendList();
    }, [searchInputValue]);
    //console.log(rooms);
    //console.log(allUsers);
    //console.log(friendList);


    //---------------------------------------------------------------------------------------
    const searchedUser = allUsers.filter((user) => {
        if (searchInputValue) {
            if (
                user.name.toLowerCase().includes(searchInputValue.toLowerCase())
            ) {
                return user;
            }
        }
    });
    //console.log(searchedUser);

    //---------------------------------------------------------------------------------------
    const searchItem = searchedUser.map((eachUser) => {
        return (
            <SidebarChats
                key={eachUser.userUid}
                name={eachUser.name}
                id={eachUser.userUid}
                photoURL={eachUser.photoUrl}
                setIsSearching={setIsSearching}
                setSearchInputValue={setSearchInputValue}
            />
        );
    });


    //---------------------------------------------------------------------------------------
    const friendListItem = friendList.map((eachUser) => {
        return (
            <SidebarChats
                key={eachUser.userUid}
                name={eachUser.name}
                id={eachUser.userUid}
                photoURL={eachUser.photoUrl}
                setIsSearching={setIsSearching}
                setSearchInputValue={setSearchInputValue}
            />
        );
    });
    //---------------------------------------------------------------------------------------


    return (
        <>
            {/* className sidebar is the main containar in left side div */}
            <div className="sidebar">

                <div className="sidebar_header">
                    {/* IconButton component is a inbuild component in the material ui that frovied button like fitures */}
                    <Avatar src={user?.photoURL} />

                    {/* classname sidebar_header_right this sidebar heder right part which contains alll icon */}
                    <div className="sidebar_header_right">

                        <IconButton >
                            <DonutLargeIcon onClick={() => signOut(auth)} />
                        </IconButton>

                        <IconButton >
                            <ChatIcon />
                        </IconButton>

                        <IconButton >
                            <MoreVertIcon />
                        </IconButton>

                    </div>
                    {/* {console.log(user.photoURL)} */}
                </div>

                <div className='sidebar_search'>
                    <div className='sidebar_search_container'>
                        <label htmlFor='search-input'>
                            <IconButton >
                                <SearchIcon />
                            </IconButton>
                        </label>

                        <input type="text" id='search-input' placeholder='search & start a new chat' value={searchInputValue} onChange={(event) => setSearchInputValue(event.target.value)} />
                    </div>
                </div>

                <div className="sidebar_chats">

                    {searchItem.length > 0 ? searchItem : (<>
                        {/* send props addNewChat and render 1st component is add new chat */}
                        <SidebarChats addNewChat={true} />

                        {rooms.map((room) => <SidebarChats key={room.id} name={room.name} id={room.id} />)}
                        {friendListItem}
                    </>)}

                </div>
            </div>
        </>
    )
}

export default Sidebar;