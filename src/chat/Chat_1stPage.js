
import "./Chat_1stpage.css"
import img from "../image/landing-time-photo.jpg"

import LockIcon from '@mui/icons-material/Lock';

function Chat_1stpage() {

    //-------------------------------------------------------------
    return (
        <div className="chat-1st-page">
            <div className="chat-1st-page-wrapper">

                <img className="Chat_1stPagePhoto" src={img} />
                <h1 className="chat-1st-page-header">WhatsApp Web</h1>


                <p>Send and receive messages without keeping your phone online.
                    <br />
                    Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</p>
                <p><LockIcon /> End-to-end encrypted</p>

            </div>
        </div>
    )
}

export default Chat_1stpage;