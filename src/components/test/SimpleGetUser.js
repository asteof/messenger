import React, {useState} from 'react';
import style from './test.module.css'
import GetUser from "./getUser";
import SimpleLogin from "./SimpleLogin";
import SimpleUpdateMessage from "./SimpleUpdateMessage";
import SimpleChatFetch from "./SimpleChatFetch";
import SimpleGetMessages from "./SimpleGetMessages";

const SimpleGetUser = () => {
    const [newJWT, setNewJWT] = useState('')

    return (
        <div className={style.wrap}>
            <SimpleLogin setNewJWT={setNewJWT}/>
            {/*{newJWT}*/}
            <GetUser newJWT={newJWT}/>
            <SimpleChatFetch newJWT={newJWT}/>
            <SimpleGetMessages newJWT={newJWT}/>
            <SimpleUpdateMessage newJWT={newJWT}/>
        </div>
    )
}

export default SimpleGetUser