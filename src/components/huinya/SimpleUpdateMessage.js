import React, {useState} from 'react';
import axios from "axios";
import style from './test.module.css'
import {SECURED_API_PATH} from "../constants/API_PATH_DEFAULT";

const SimpleUpdateMessage = (props) => {
    const newJWT = props.newJWT

    const [msgId, setMsgId] = useState(0)
    const [msg, setMsg] = useState('updated message')

    const changeMessage = (e) => {
        e.preventDefault()
        axios.put(`${SECURED_API_PATH}/messages/${msgId}`, {text: msg}, {
            headers: {authorization: newJWT}
        })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className={style.wrap}>
            <div className={style.hint}>Choose message to update, click update button.</div>
            <form onSubmit={changeMessage} className={style.testForm}>
                <div>
                    <label htmlFor="">Message ID</label>
                    <div>
                        <input type="number" value={msgId} onChange={e => setMsgId(e.target.value)} className={style.inputField}/>
                    </div>
                </div>

                <div>
                    <label htmlFor="">New text</label>
                    <div>
                        <input type="text" value={msg} onChange={e => setMsg(e.target.value)} className={style.inputField}/>
                    </div>
                </div>

                <div>
                    <input type="submit" value='Update' className={style.submitBtn}/>
                </div>
            </form>
            <div className={style.extraSmall}>{JSON.stringify(newJWT)}</div>
        </div>
    )
}
export default SimpleUpdateMessage