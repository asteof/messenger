import React, {useEffect, useState} from 'react';
import style from './FieldEdit.module.css'
import {toggleBoolean} from "../../../constants/ChangeDisplayStyle";
import axios from "axios";
import {SECURED_API_PATH} from "../../../constants/API_PATH_DEFAULT";
import {getLocalWithExpiry} from "../../../constants/localStorage";

const FieldEdit = (props) => {
    const {currentUser, setCurrentUser, setShowEdit, options: {editProperty, displayProperty}} = props
    const [value, setValue] = useState('')

    //использовать useRef для создания текущих значений текущего пользователя (валидация изменений)

    const getUserValueToChange = () => {
        for (const [key, value] of Object.entries(currentUser)) {
            // console.log(`FieldEdit.js ${key}: ${value}`);
            // console.log(value,options);
            // console.log(editProperty, displayProperty);
            if (key === editProperty) {
                console.log(value)
                return value
            }
        }
    }

    const closeEdit = () => {
        toggleBoolean(setShowEdit)
    }

    let valueToChange
    useEffect(() => {
        valueToChange = getUserValueToChange()
        setValue(valueToChange)
    }, [])

    const edit = async event => {
        event.preventDefault()

        const JWT = getLocalWithExpiry('token')
        if (JWT !== null && JWT !== '') {
            let JWT_header = `Bearer ${JWT}`
            const cancelToken = axios.CancelToken
            const source = cancelToken.source()

            await updateUser(JWT_header, setCurrentUser, source)
        }
        closeEdit()
    }


    const updateUser = async (JWT_header, setCurrentUser, source) => {
        try {
            //first request is PUT, to change user data
            const updateUser = await axios.put(
                `${SECURED_API_PATH}/user`,
                {[editProperty]: value},
                {headers: {authorization: JWT_header}, cancelToken: source.token}
            )
            const updateUserResponse = updateUser.status
            console.log(updateUserResponse)

            //when response is received if response.status is 200 fires second request
            if (updateUserResponse === 202) {
                try {
                    //second request gets user with updated data
                    const setUpdatedUser = await axios.get(
                        `${SECURED_API_PATH}/user`,
                        {headers: {authorization: JWT_header}, cancelToken: source.token}
                    )
                    const updatedUser = setUpdatedUser.data
                    console.log(updatedUser)
                    //after receiving the response user is set for the app
                    setCurrentUser(updatedUser)
                } catch (error) {
                    console.log('setUpdatedUser error', error)
                    source.cancel()
                }
            } else {
                source.cancel()
            }
        } catch (error) {
            console.log('updateUser', error)
        }
    }

    return (
        <div className={style.editWrap}>
            <div className={style.editBlock}>
                <p>Edit your {displayProperty}</p>
                <form spellCheck="false" autoComplete="off" onSubmit={edit}>
                    <div className={style.formInput}>
                        <label htmlFor="property" className={style.fieldLabel}>{displayProperty}</label>
                        <input type="text"
                               id='property'
                               value={value}
                               className={style.inputField}
                               autoFocus
                               onChange={e => setValue(e.target.value)}
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

export default FieldEdit