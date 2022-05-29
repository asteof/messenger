import axios from "axios";
import {SECURED_API_PATH} from "../../../constants/API_PATH_DEFAULT";

const get = (newJWT) => {
    let JWT_header
    if (newJWT !== "") {
        JWT_header = `Bearer ${newJWT}`
        // console.log(`getUser.js ${JWT_header}`)
    }
    let resp
    axios.get(`${SECURED_API_PATH}/user`, {headers: {authorization: JWT_header}})
        .then(response => {
            console.log('getUser.js user:', response)
            // setTestCurrentUser(response.data)
            resp = response.data
        })
        .catch(error => console.log('getUser.js', error))
    return resp
}

const getUser = (JWTs) => {
    return {
        voko: get(JWTs.voko),
        kirpich: get(JWTs.kirpich),
        masha_lar: get(JWTs.masha_lar),
        danylo: get(JWTs.danylo)
    }
}

export default getUser
