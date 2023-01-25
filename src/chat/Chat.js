import "./Chat.css"

import { Avatar, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

function Chat() {
    return (
        <div className="chat">

            {/* chat header on the part right  side of the chat chat header */}
            <div className="chat_header">
                <Avatar />
                <div className="chat_header_info">
                    <h3>Room Name</h3>
                    <p>Last seen</p>
                </div>

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
            <div className="chat_body">
                <p className="chat_message chat_receiver">
                    <span className="chat_name">Tushar</span>
                    this is test messge .....
                    <span className="chat_time">9:31 AM</span>
                </p>

                <p className="chat_message">
                    <span className="chat_name">Tushar</span>
                    this is test messge .....
                    <span className="chat_time">9:31 AM</span>
                </p>

                <p className="chat_message chat_receiver">
                    <span className="chat_name">Tushar</span>
                    this is test messge .....
                    <span className="chat_time">9:31 AM</span>
                </p>

                <p className="chat_message chat_receiver">
                    <span className="chat_name">Tushar</span>
                    this is test messge .....
                    <span className="chat_time">9:31 AM</span>
                </p>

                <p className="chat_message">
                    <span className="chat_name">Tushar</span>
                    this is test messge .....
                    <span className="chat_time">9:31 AM</span>
                </p>
            </div>

            {/* it is chat footer part where type the messge */}
            <div className="chat_footer">
                <IconButton>
                    <SentimentVerySatisfiedIcon />
                </IconButton>

                <IconButton>
                    <AttachFileIcon />
                </IconButton>


                <form>
                    <input type="text" placeholder="Type a messge" />
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