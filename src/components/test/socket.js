import React, {useState} from 'react';
import style from './test.module.css'
import SockJS from 'sockjs-client'
import {Client} from '@stomp/stompjs'
import {API_PATH} from "../constants/API_PATH_DEFAULT";

const Socket = () => {

    const [socketData, setSocketData] = useState({
        con: '',
        msg: '',
        cls: '',
        err: ''
    })
    const {con, err, cls, msg} = socketData

    const connectWs = () => {

        const client = new Client({
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        })

        client.webSocketFactory = () => {
            return new SockJS(`${API_PATH}/ws`)
        }

        client.onConnect = function (frame) {
            // Do something, all subscribes must be done is this callback
            // This is needed because this will be executed after a (re)connect
            const userId = 1
            const onmessage = (message) => {
                if (message.body) {
                    alert('got message with body ' + message.body);
                    setSocketData(prev=>({
                        ...prev, msg: message.body
                    }))
                } else {
                    alert('got empty message');
                }
            }

            let subscription = client.subscribe(`/topic/messages/user/${userId}`, onmessage);
            console.log(subscription)

            console.log('con', frame)
        };

        client.onStompError = function (frame) {
            // Will be invoked in case of error encountered at Broker
            // Bad login/passcode typically will cause an error
            // Complaint brokers will set `message` header with a brief message. Body may contain details.
            // Compliant brokers will terminate the connection after any error
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };

        client.activate();
    }

    return (
        <div className={style.wrap}>
            <div>Connection: {con}</div>
            <div>Message: {msg}</div>
            <div>Close: {cls}</div>
            <div>Error: {err}</div>
            <button className={style.submitBtn}
                    onClick={connectWs}>
                Socket
            </button>
        </div>
    )
}

export default Socket