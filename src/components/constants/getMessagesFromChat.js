import axios from "axios";
import {SECURED_API_PATH} from "./API_PATH_DEFAULT";
import {getBearerToken} from "./getBearerToken";

//sets messages array

//then implementation
const getMessagesFromChat = (JWT_header, chatId, page = 0, file = 'none') => {
    if (JWT_header !== null) {
        return axios.get(`${SECURED_API_PATH}/messages/chat/${chatId}`, {
//      ^^^^^^
            headers: {authorization: JWT_header},
            params: {size: 60, page: page}
        })
            .then(response => {
                console.log(`messages (fetch) ${file}.js`, response)
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

const getMessages = async (chatId, page = 0) => {
    const JWT_header = getBearerToken()
    if (JWT_header !== null) {
        try {
            const messages = await getMessagesFromChat(JWT_header, chatId, page)
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