import axios from "axios";
import {SECURED_API_PATH} from "../../../constants/API_PATH_DEFAULT";

const message = (newJWT, currentUser, secondUser) => {
    let JWT_header, message = ''
    if (newJWT !== "") {
        JWT_header = `Bearer ${newJWT}`
        if (typeof currentUser !== "undefined") {
            message = {
                text: `${currentUser.username} to ${secondUser.username}`,
                recipientId: secondUser.id
            }
        }
    }
    axios.post(`${SECURED_API_PATH}/messages/`, message, {
        headers: {authorization: JWT_header}
    })
        .then(response => {
            console.log('sendMessage.js', response.data)
            // return response.data
        })
        .catch(error => console.log('sendMessage.js', error, error.response))
}
const sendMessages = (JWT1, JWT2, JWT3, JWT4, voko, kirpich, masha_lar, danylo) => {

    message(JWT1, voko, kirpich)
    message(JWT1, voko, masha_lar)
    message(JWT1, voko, danylo)

    message(JWT2, kirpich, voko)
    message(JWT2, kirpich, masha_lar)
    message(JWT2, kirpich, danylo)

    message(JWT3, masha_lar, kirpich)
    message(JWT3, masha_lar, voko)
    message(JWT3, masha_lar, danylo)

    message(JWT4, danylo, voko)
    message(JWT4, danylo, masha_lar)
    message(JWT4, danylo, kirpich)
}

export default sendMessages
