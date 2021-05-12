import {getLocalWithExpiry} from "./localStorage";

const getToken = (filename = 'none') => {
    const JWT = getLocalWithExpiry('token')
    let JWT_header
    if (JWT !== null && JWT !== "") {
        JWT_header = `Bearer ${JWT}`
        console.log(`${filename}.js ${JWT_header}`)
    } else {
        return null
    }
    return JWT_header
}

export {getToken}