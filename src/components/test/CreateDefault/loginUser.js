import axios from "axios";
import {API_PATH} from "../../constants/API_PATH_DEFAULT";


const login = (username) => {
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    let resp

    let formData = new FormData()
    formData.append('username', username)
    formData.append('password', '123')

    axios.post(`${API_PATH}/login`, formData, {cancelToken: source.token})
        .then(response => {
            if (response.status === 200) {
                console.log('Token successfully acquired (loginUser.js)', response)
                resp = response.data.access_token
                console.log('resp', resp)
                // return response
            }
        })
        .catch(err => {
            console.log('loginUser.js', err)
            source.cancel('canceled after error')
        })

    return resp
}


const getJWT = () => {
    return {
        voko: login('voko'),
        kirpich: login('kirpich'),
        masha_lar: login('masha_lar'),
        danylo: login('danylo')
    }
}

export default getJWT