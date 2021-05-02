import React, {useEffect, useState} from 'react';
import style from '../FieldEdit/FieldEdit.module.css'
import {toggleBoolean} from "../../ProfileBar/ChangeDisplayStyle";
import axios from "axios";
import {SECURED_API_PATH} from "../../../constants/API_PATH_DEFAULT";
import {getLocalWithExpiry} from "../../../Authorization/localStorage";

const NameEdit = (props) => {
    const {currentUser, setShowNameEdit} = props
    const [name, setName] = useState({
        firstname: currentUser.firstname,
        lastname: currentUser.lastname
    })
    const inputHandle = event => {
        setName(prevName => ({
            ...prevName,
            [event.target.id]: event.target.value
        }))
    }

    const closeEdit = () => {
        toggleBoolean(setShowNameEdit)
    }

    const edit = event => {
        event.preventDefault()
        const JWT = getLocalWithExpiry('token')
        if (JWT !== null && JWT !== '') {
            axios.put(`${SECURED_API_PATH}/user`, name,
                {
                    headers: {
                        authorization: `Bearer: ${JWT}`
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


    console.log('NameEdit.js current user', currentUser)
    console.log('names',currentUser.firstname,currentUser.lastname, typeof currentUser.firstname)
    console.log('name', name)


    return (
        <div className={style.editWrap}>
            <div className={style.editBlock}>
                <p>Edit your name</p>
                <form spellCheck="false" onSubmit={edit}>
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
                               onChange={e => setName(e.target.value)}
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

export default NameEdit