import React, {useState} from 'react';
import style from './test.module.css'
import SimpleGetUser from "./SimpleGetUser";
import SimpleLogin from "./SimpleLogin";
import SimpleUpdateMessage from "./SimpleUpdateMessage";
import SimpleChatFetch from "./SimpleChatFetch";
import SimpleGetMessages from "./SimpleGetMessages";
import SimpleSendMessage from "./SimpleSendMessage";

const Simpler = () => {
    const [newJWT, setNewJWT] = useState('')
    const [testCurrentUser, setTestCurrentUser] = useState({})

    return (
        <div className={style.wrap}>
            <SimpleLogin setNewJWT={setNewJWT}/>
            <SimpleGetUser newJWT={newJWT}
                           testCurrentUser={testCurrentUser}
                           setTestCurrentUser={setTestCurrentUser}/>
            <SimpleChatFetch newJWT={newJWT}/>
            <SimpleGetMessages newJWT={newJWT}/>
            <SimpleSendMessage newJWT={newJWT}
                               testCurrentUser={testCurrentUser}/>
            <SimpleUpdateMessage newJWT={newJWT}/>
        </div>
    )
}

export default Simpler