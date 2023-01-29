import './App.css';
import Sidebar from "./sidebar/Sidebar"
import Chat from "./chat/Chat"

import {collection, getDocs } from 'firebase/firestore';
import {db} from "./firebas";

function App() {
  //const [rooms, setRooms] = useState([]);

//  useEffect(() => {
//         db.collection("rooms").onSnapshot(snapshot => {
//             setRooms(snapshot.docs.map((doc) => {
//                 //id: doc.id,
//                 //data: doc.data()
//                 console.log(doc.data());
//             }))
//         })
//     }, [])


  return (
    <div className="app">
      <div className='app_body'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
