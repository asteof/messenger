import React, {useEffect, useState} from 'react';
import style from './FieldEdit.module.css'
import {toggleBoolean} from "../../../constants/ChangeDisplayStyle";
import axios from "axios";
import {SECURED_API_PATH} from "../../../constants/API_PATH_DEFAULT";
import {getLocalWithExpiry} from "../../../Authorization/localStorage";

const FieldEdit = (props) => {
    const {currentUser, setShowEdit, options: {editProperty, displayProperty}} = props
    const [value, setValue] = useState('')

    const getUserValueToChange = () => {
        for (const [key, value] of Object.entries(currentUser)) {
            console.log(`FieldEdit.js ${key}: ${value}`);
            // console.log(key);
            // console.log(value,options);
            console.log(editProperty, displayProperty);
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

    const edit = event => {
        event.preventDefault()
        const JWT = getLocalWithExpiry('token')
        if (JWT !== null && JWT !== '') {
            axios.put(`${SECURED_API_PATH}/user`, {
                    [editProperty]: value
                },
                {
                    headers: {
                        authorization: `Bearer ${JWT}`
                    }
                }
            )
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }


    console.log('FieldEdit.js current user', currentUser)


    return (
        <div className={style.editWrap}>
            <div className={style.editBlock}>
                <p>Edit your {displayProperty}</p>
                <form spellCheck="false" onSubmit={edit}>
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