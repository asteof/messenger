import React, {useEffect, useRef, useState} from 'react';
import style from './ContactsList.module.css'
import {toggleBoolean} from "../../../constants/ChangeDisplayStyle";

import Contact from "./Contact/Contact";
import RandomColor from "../../../constants/RandomColor";
import {getBearerToken} from "../../../constants/getBearerToken";
import axios from "axios";
import {SECURED_API_PATH} from "../../../constants/API_PATH_DEFAULT";
import RemoveContact from "./RemoveContact/RemoveContact";
import MessageForm from "../MessageForm/MessageForm";
import UserProfile from "../UserProfile/UserProfile";

const ContactsList = (props) => {
    const {setShowContacts, profilePictureColors, setMenuMessageSent} = props

    const [contactsData, setContactsData] = useState(null)
    const [contacts, setContacts] = useState([])
    const [contactToRemove, setContactToRemove] = useState({
        id: 0,
    })
    const [contactToMessage, setContactToMessage] = useState({
        id: 0,
    })
    const [selectedUser, setSelectedUser] = useState(null)
    const [contactIsRemoved, setContactIsRemoved] = useState(0)
    const contactsRef = useRef(null)
    const contactsBgRef = useRef(null)
    const [showRemove, setShowRemove] = useState(false)
    const [showMessageForm, setShowMessageForm] = useState(false)
    const [showUserProfile, setShowUserProfile] = useState(false)

    const closeContacts = () => {
        toggleBoolean(setShowContacts)
    }

    const closeOnEscape = (event) => {
        if (event.code === 'Escape') {
            closeContacts()
        }
    }

    //initial render, fetch contacts
    useEffect(() => {
        const JWT_header = getBearerToken("contacts")
        if (JWT_header !== null) {
            axios.get(
                `${SECURED_API_PATH}/contacts`,
                {headers: {authorization: JWT_header}})
                .then(response => {
                    console.log(response)
                    setContactsData(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
            contactsRef.current.focus()
        } else {
            closeContacts()
        }
    }, [])


    useEffect(() => {
        if (contactsData !== null) {
            const contacts = contactsData.map(contact => {

                let color = profilePictureColors[contact.id]
                if (color === undefined) {
                    color = RandomColor()
                }

                return <Contact key={contact.id}
                                userId={contact.id}
                                username={contact.username}
                                firstname={contact.firstname}
                                lastname={contact.lastname}
                                email={contact.email}
                                setSelectedUser={setSelectedUser}
                                setContactToRemove={setContactToRemove}
                                setContactToMessage={setContactToMessage}
                                profilePictureColors={color}/>
            })
            setContacts(contacts)
            console.log(contacts)
        }
    }, [contactsData])

    //open remove contact form
    useEffect(() => {
        if (contactToRemove.id !== 0) {
            contactsRef.current.blur()
            toggleBoolean(setShowRemove)
        }
    }, [contactToRemove])

    //open send message form
    useEffect(() => {
        if (contactToMessage.id !== 0) {
            contactsRef.current.style.display = 'none'
            toggleBoolean(setShowMessageForm)
        }
    }, [contactToMessage])

    //reload contacts when contact is removed
    useEffect(() => {
        if (contactIsRemoved !== 0) {
            const newContacts = contactsData.filter(contact => contact.id !== contactIsRemoved)
            setContactsData(newContacts)
        }
    }, [contactIsRemoved])

    useEffect(() => {
        if (selectedUser !== null) {
            contactsRef.current.style.display = 'none'
            contactsBgRef.current.style.display = 'none'
            toggleBoolean(setShowUserProfile)
        }
    }, [selectedUser])

    return (
        <div className={style.contactsWrap}>

            <div className={style.contacts}
                 ref={contactsRef} tabIndex='0'
                 onKeyDown={closeOnEscape}>

                <div className={style.closeIcon}
                     onClick={closeContacts}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF"
                         strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <g>
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </g>
                    </svg>
                </div>

                <div className={style.heading}>
                    <h2>Contacts</h2>
                </div>

                <div className={style.contactsList}>
                    <div className={style.separator}/>
                    {contacts.length > 0 ? contacts :
                        <div className={style.notFound}>
                            It looks like you don't have contacts yet.
                            <br/>Do you want to find someone?
                        </div>
                    }
                </div>

                {showRemove &&
                <RemoveContact contactToRemove={contactToRemove}
                               username={contactToRemove.username}
                               setShowRemove={setShowRemove}
                               setContactIsRemoved={setContactIsRemoved}/>}


            </div>
            {/*//contacts*/}
            {showMessageForm &&
            <MessageForm setShowMessageForm={setShowMessageForm}
                         parentRef={contactsRef.current}
                         setMenuMessageSent={setMenuMessageSent}
                         user={contactToMessage}/>}

            {showUserProfile &&
            <UserProfile user={selectedUser}
                         setShowUserProfile={setShowUserProfile}
                         parentRef={contactsRef.current}
                         addRef={contactsBgRef.current}
                         color={profilePictureColors[selectedUser.id]}/>
            }

            <div className={style.background} ref={contactsBgRef} onClick={closeContacts}/>
        </div>
    )
}

export default ContactsList