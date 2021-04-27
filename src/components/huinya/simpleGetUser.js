import React, {useState, useEffect} from 'react';
import axios from "axios";
import style from './test.module.css'
import {API_PATH, SECURED_API_PATH} from "../constants/API_PATH_DEFAULT";
import GetUser from "./getUser";
import SimpleLogin from "./simpleLogin";

const SimpleGetUser = () => {
    const [newJWT, setNewJWT] = useState('')

    return (
        <div className={style.wrap}>
            <SimpleLogin setNewJWT={setNewJWT}/>
            {newJWT}
            <GetUser newJWT={newJWT}/>
        </div>
    )
}

export default SimpleGetUser