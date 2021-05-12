import axios from "axios";
import {SECURED_API_PATH} from "./API_PATH_DEFAULT";
import {getToken} from "./getToken";

//sets messages array

//then implementation
const getMessagesFromChat = (JWT_header, chatId) => {
    if (JWT_header !== '') {
        return axios.get(`${SECURED_API_PATH}/messages/chat/${chatId}`, {
//      ^^^^^^
            headers: {authorization: JWT_header},
            params: {size: 80, page: 0}
        })
            .then(response => {
                console.log('messages (fetch)', response)
                return response.data
            })
            .catch(error => {
                console.log(error)
                return null
            })
    } else {
        return Promise.resolve(null)
//      ^^^^^^ important for chaining
    }
}
//async implementation

// async function getMessagesFromChat(JWT_header, chatId) {
//     if (JWT_header !== '') {
//         const response = await axios.get(`${SECURED_API_PATH}/messages/chat/${chatId}`, {
// //                      ^^^^^
//             headers: {authorization: JWT_header},
//             params: {size: 80, page: 0}
//         });
//         console.log('messages (fetch)', response.data)
//         return response.data
//     }
//     // else return undefined
// }


const getMessages = async (chatId) => {
    const JWT_header = getToken()
    if (JWT_header !== null) {
        try {
            const messages = await getMessagesFromChat(JWT_header, chatId)
            console.log('messages (getMessages)', messages)
            return messages
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

export default getMessagesFromChat
export {getMessages}