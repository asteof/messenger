import axios from "axios";
import {API_PATH} from "../../../constants/API_PATH_DEFAULT";

const users = (firstname, lastname, username, email, phoneNumber, password) => {

    const cancelToken = axios.CancelToken
    const source = cancelToken.source()

    const userData = {
        firstname,
        lastname,
        username,
        email,
        phoneNumber,
        password
    }
    console.log(userData)
    axios.post(`${API_PATH}/sign-up`, userData, {cancelToken:source.token})
        .then(response => {
            console.log(response)
            console.log(`User created successfully (createUser.js)`,
            response.data,response.status,response.data )
        })
        .catch(error => {
            if (error.response.status === 400) {
                console.log(`User ${username} already exists`)
                source.cancel('user creation canceled')
            } else {
                alert(`User ${username} creation failed:\n${error}`)
            }
            if (axios.isCancel(error)) {
                console.log(`cancelled`)
            }
            console.log(error)
        })
}

const create = () => {
    // return new Promise(resolve => {
        users('Kostya', 'V', 'voko',
            'voko@gmail.com', '180169696969', '123');

        setTimeout(() => {
            users('kirpich', '', 'kirpich',
            'kirpich@gmail.com', '280269696969', '123')
        }, 800);

        setTimeout(() => {
            users('Maria', 'Larikova', 'masha_lar',
                'masha@gmail.com', '380369696969', '123')
        }, 1200);

        setTimeout(() => {
            users('Danylo', 'from Rivne', 'danylo',
                'danylo@gmail.com', '480469696969', '123')
        }, 1600);
        // return Promise.resolve('users created')
    // })
}

export default create
