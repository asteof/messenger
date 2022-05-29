import React, {useRef, useState} from 'react';
import style from './FieldEdit.module.css'
import {toggleBoolean} from "../../../../../constants/ChangeDisplayStyle";
import axios from "axios";
import {SECURED_API_PATH} from "../../../../../constants/API_PATH_DEFAULT";
import {getBearerToken} from "../../../../../constants/getBearerToken";

const NameEdit = (props) => {
    const {currentUser, setCurrentUser, setShowNameEdit} = props
    const [name, setName] = useState({
        firstname: currentUser.firstname,
        lastname: currentUser.lastname
    })
    const firstnameRef = useRef(currentUser.firstname)
    const lastnameRef = useRef(currentUser.lastname)
    const inputHandle = event => {
        setName(prevName => ({
            ...prevName,
            [event.target.id]: event.target.value
        }))
    }

    const closeEdit = () => {
        toggleBoolean(setShowNameEdit)
    }

    const edit = async event => {
        event.preventDefault()

        if (firstnameRef.current !== name.firstname
            || lastnameRef.current !== name.lastname) {
            const JWT_header = getBearerToken()
            if (JWT_header !== null) {
                await updateUser(JWT_header)
            }
        }
        closeEdit()
    }

    console.log(firstnameRef, lastnameRef, name)

    const updateUser = async (JWT_header) => {
        try {
            //first request is PUT, to change user data
            const updateUser = await axios.put(
                `${SECURED_API_PATH}/user`,
                name,
                {headers: {authorization: JWT_header}}
            )
            const updateUserResponse = updateUser.status
            // console.log(updateUserResponse)

            //when response is received if response.status is 200 fires second request
            if (updateUserResponse === 202) {
                try {
                    //second request gets user with updated data
                    const setUpdatedUser = await axios.get(
                        `${SECURED_API_PATH}/user`,
                        {headers: {authorization: JWT_header}}
                    )
                    const updatedUser = setUpdatedUser.data
                    // console.log(updatedUser)
                    //after receiving the response user is set for the app
                    setCurrentUser(updatedUser)
                } catch (error) {
                    console.log('setUpdatedUser error', error)
                }
            }
        } catch (error) {
            console.log('updateUser', error)
        }
    }

    // console.log('NameEdit.js current user', currentUser)
    // console.log('names',currentUser.firstname,currentUser.lastname, typeof currentUser.firstname)
    // console.log('name', name)


    return (
        <div className={style.editWrap}>
            <div className={style.editBlock}>
                <p>Edit your name</p>
                <form spellCheck="false" autoComplete='off' onSubmit={edit}>
                    <div className={style.formInput}>
                        <label htmlFor="firstname" className={style.fieldLabel}>First name</label>
                        <input type="text"
                               id='firstname'
                               value={name.firstname}
                               className={style.inputField}
                               autoFocus
                               onChange={inputHandle}
                        />
                    </div>

                    <div className={style.formInput}>
                        <label htmlFor="lastname" className={style.fieldLabel}>Last name</label>
                        <input type="text"
                               id='lastname'
                               value={name.lastname}
                               className={style.inputField}
                               onChange={inputHandle}
                        />
                    </div>
                    <div className={style.confirmation}>
                        <button type="button"
                                className={style.editButton}
                                onClick={closeEdit}
                        >Cancel
                        </button>
                        <input type="submit" value='Save' className={style.editButton}/>
                    </div>
                </form>
            </div>
            <div className={style.background} onClick={closeEdit}/>
        </div>
    )
}
//test
export default NameEdit
