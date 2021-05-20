import {Client} from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {API_PATH} from "./API_PATH_DEFAULT";

const webSocketInstance = (setReceivedMessage, currentUserId) => {
    const client = new Client({
        debug: str => console.log(str),
        reconnectDelay: 4000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    })

    client.webSocketFactory = () => {
        return new SockJS(`${API_PATH}/ws`)
    }

    client.onConnect = (frame) => {
        // Do something, all subscribes must be done is this callback
        // This is needed because this will be executed after a (re)connect
        const onmessage = (message) => {
            if (message.body) {
                console.log('got message with body ' + message.body);
                // alert('got message with body ' + message.body);
                const msg = JSON.parse(message.body)
                setReceivedMessage(() => msg)
            } else {
                console.log('got empty message');
            }
        }

        // let subscription =
            client.subscribe(`/topic/messages/user/${currentUserId}`, onmessage);

    };

    client.onStompError = function (frame) {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
    };

    client.activate()
}

export {webSocketInstance}