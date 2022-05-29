import React, {useEffect, useRef, useState} from 'react';
import style from './Profile.module.css'
import {toggleBoolean} from "../../../../constants/ChangeDisplayStyle";

import user from '../../../../media/icons/user.svg'
import phone from '../../../../media/icons/phone.svg'
import email from '../../../../media/icons/email.svg'
import username from '../../../../media/icons/username.svg'
import edit from '../../../../media/icons/edit.svg'
import FieldEdit from "./FieldEdit/FieldEdit";
import NameEdit from "./FieldEdit/NameEdit";
import PasswordChange from "./FieldEdit/PasswordChange";

const Profile = (props) => {
    const {currentUser, setCurrentUser, setShowProfile, color} = props

    const [options, setOptions] = useState({
        editProperty: '',
        displayProperty: ''
    })
    const [showEdit, setShowEdit] = useState(false)
    const [showNameEdit, setShowNameEdit] = useState(false)
    const [showPasswordChange, setShowPasswordChange] = useState(false)
    const profileRef = useRef(null)

    const openEditField = (editValue, displayValue) => {
        toggleBoolean(setShowEdit);
        setOptions(prevOptions => ({
            ...prevOptions,
            editProperty: editValue,
            displayProperty: displayValue
        }))
    }
    const openNameEdit = () => {
        toggleBoolean(setShowNameEdit);
    }

    const openPasswordChange = () => {
        toggleBoolean(setShowPasswordChange)
    }

    const closeProfile=()=>{
        toggleBoolean(setShowProfile)
    }

    const closeOnEscape = (event) => {
        if (event.code === 'Escape') {
            closeProfile()
        }
    }
    useEffect(() => {
        console.log('Profile.js current user', currentUser);
        profileRef.current.focus()
    }, [])

    return (
        <div className={style.profileWrap}>

            <div className={style.profile}
                 ref={profileRef} tabIndex='0'
            onKeyDown={closeOnEscape}>

                <div className={style.closeIcon}
                     onClick={closeProfile}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF"
                         strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <g>
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </g>
                    </svg>
                </div>

                <div className={style.profilePictureWrap}>
                    <div className={style.profilePicture} style={color}>
                        {currentUser !== {} &&
                        <p className={style.initials}>
                            {((currentUser.firstname || '').charAt(0) || '').toUpperCase()}
                            {((currentUser.lastname || '').charAt(0) || '').toUpperCase()}
                        </p>
                        }
                    </div>
                </div>
                {/*//profilePictureWrap*/}

                <div className={style.profileData}>

                    <div className={`${style.name} ${style.fieldWrap}`}
                         onClick={openNameEdit}>
                        <img src={user} alt="Name" className={style.icon}/>
                        <div className={style.field}>
                            <span className={style.fullName}>
                                 <span>{currentUser.firstname} {currentUser.lastname}</span>
                            </span>
                            <span className={style.fieldHint}>Name</span>
                        </div>
                        <img src={edit} alt="Edit" className={`${style.icon} ${style.editIcon}`}/>
                    </div>

                    <div className={`${style.username} ${style.fieldWrap}`}
                         onClick={() => openEditField('username', 'username')}>
                        <img src={username} alt="User" className={style.icon}/>
                        <div className={style.field}>
                            <span>{currentUser.username}</span>
                            <span className={style.fieldHint}>Username</span>
                        </div>
                        <img src={edit} alt="Edit" className={`${style.icon} ${style.editIcon}`}/>
                    </div>

                    <div className={`${style.email} ${style.fieldWrap}`}
                         onClick={() => openEditField('email', 'email')}>
                        <img src={email} alt="Email" className={style.icon}/>
                        <div className={style.field}>
                            <span>{currentUser.email}</span>
                            <span className={style.fieldHint}>Email</span>
                        </div>
                        <img src={edit} alt="Edit" className={`${style.icon} ${style.editIcon}`}/>
                    </div>

                    <div className={`${style.phone} ${style.fieldWrap}`}
                         onClick={() => openEditField('phoneNumber', 'phone number')}>
                        <img src={phone} alt="Phone" className={style.icon}/>
                        <div className={style.field}>
                            <span>+{currentUser.phoneNumber}</span>
                            <span className={style.fieldHint}>Phone number</span>
                        </div>
                        <img src={edit} alt="Edit" className={`${style.icon} ${style.editIcon}`}/>
                    </div>

                    <div className={style.password}>
                        <span className='link' onClick={openPasswordChange}>
                            Change password
                        </span>
                    </div>

                </div>
                {/* //profileData*/}

                {showEdit &&
                <FieldEdit currentUser={currentUser}
                           setCurrentUser={setCurrentUser}
                           options={options}
                           setShowEdit={setShowEdit}/>}

                {showNameEdit &&
                <NameEdit currentUser={currentUser}
                          setCurrentUser={setCurrentUser}
                          setShowNameEdit={setShowNameEdit}/>}

                {showPasswordChange &&
                <PasswordChange currentUser={currentUser}
                                setShowPasswordChange={setShowPasswordChange}/>}

            </div>
            {/*//profile*/}

            <div className={style.background} onClick={closeProfile}/>
        </div>
    )
}

export default Profile
