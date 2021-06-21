import React from 'react';
import style from './Contact.module.css'
import sendMessage from '../../../../../media/icons/send-message.svg'
import removeContact from '../../../../../media/icons/remove-contact.svg'

const Contact = (props) => {
    const {
        profilePictureColors, setContactToMessage,
        setContactToRemove, userId, setSelectedUser,
        username, firstname, lastname, email
    } = props

    const openMessageForm =() =>{
        setContactToMessage(prevContact=>({
            ...prevContact,
            id:  userId,
            firstname,
            lastname
        }))
    }

    const openRemoveContact = () =>{
        setContactToRemove(prevContact=>({
            ...prevContact,
            id:  userId,
            firstname,
            lastname
        }))
    }

    const openProfile=()=>{
        setSelectedUser(prevSU =>({
            ...prevSU,
            id: userId,
            username,
            firstname,
            lastname,
            email
        }))
    }

    return (
        <div className={style.contactWrap}>
            <div className={style.profilePicture}
                 style={profilePictureColors}
                 onClick={openProfile}>
                            <span className={style.initials}>
                                {((firstname || '').charAt(0) || '').toUpperCase()}
                                {((lastname || '').charAt(0) || '').toUpperCase()}
                            </span>
            </div>
            <div className={style.contactField}>
                <div className={style.username}>{username}</div>
                <div className={style.fullname}>{firstname} {lastname}</div>
            </div>
            <div className={style.buttons}>

                <button className={style.button} onClick={openMessageForm}>
                    <img src={sendMessage} className={style.icon} alt="Send message"/>
                </button>
                <div className={style.hint}>Send message</div>

                <button className={style.button} onClick={openRemoveContact}>
                    <img src={removeContact} className={style.icon} alt="Remove contact"/>
                </button>
                <div className={style.hint}>Remove contact</div>
            </div>
        </div>
    )
}

export default Contact