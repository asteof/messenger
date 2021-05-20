import React, {useState, useRef} from 'react';
import axios from "axios";
import style from './test.module.css'
import {getBearerToken} from "../constants/getBearerToken";
import {SECURED_API_PATH} from "../constants/API_PATH_DEFAULT";

const TestSearch = () => {

    const [user, setUser] = useState('')
    const [result, setResult] = useState([])

    const ref = useRef(null)

    const submit = e => {
        e.preventDefault()
        const JWT_header = getBearerToken('test')
        if (JWT_header !== null) {
            ref.current.innerHTML = JWT_header
            axios.get(
                `${SECURED_API_PATH}/user/search/username/${user}`,
                {headers: {authorization: JWT_header}})
                .then(response => {
                    console.log(response)
                    setResult(response.data)
                })
        } else {
            ref.current.innerHTML = 'You must login first'
        }
    }

    return (
        <div className={style.wrap}>
            <div className={style.hint}>Search user</div>
            <form onSubmit={submit}>
                <div className={style.flex}>
                    <div>
                        <input type="text"
                               className={style.inputField}
                               value={user}
                               onChange={event => setUser(() => event.target.value)}
                               placeholder='user'/>
                    </div>

                    <div>
                        <button className={style.submitBtn}>Find {user}</button>
                    </div>
                </div>
            </form>
            <div><span>Result</span> {JSON.stringify(result)}</div>
            <span className={style.hint} ref={ref}/>
        </div>
    )
}

export default TestSearch;