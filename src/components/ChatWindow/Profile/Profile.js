import React, {useEffect, useState} from 'react';
import style from './Profile.module.css'
// import {API_PATH} from "../../constants/API_PATH_DEFAULT";
// import {getLocalWithExpiry} from "../../Authorization/localStorage";
import {toggleBoolean} from "../ProfileBar/ChangeDisplayStyle";

import user from '../../../media/icons/user.svg'
import phone from '../../../media/icons/phone.svg'
import email from '../../../media/icons/email.svg'
import username from '../../../media/icons/username.svg'
import edit from '../../../media/icons/edit.svg'
import close from '../../../media/icons/close.svg'
import FieldEdit from "./FieldEdit/FieldEdit";
import NameEdit from "./NameEdit/NameEdit";

const Profile = (props) => {
    const {currentUser, setShowProfile, color} = props

    const [options, setOptions] = useState({
        editProperty: '',
        displayProperty: ''
    })
    const [showEdit, setShowEdit] = useState(false)
    const [showNameEdit, setShowNameEdit] = useState(false)

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


    console.log('Profile.js current user', currentUser)

    return (
        <div className={style.profileWrap}>

            <div className={style.profile}>
                <img src={close} alt="Close" className={style.closeIcon}
                     onClick={() => toggleBoolean(setShowProfile)}/>

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
                            {currentUser.firstname} {currentUser.lastname}
                            <span className={style.fieldHint}>Name</span>
                        </div>
                        <img src={edit} alt="Edit" className={`${style.icon} ${style.editIcon}`}/>
                    </div>

                    <div className={`${style.username} ${style.fieldWrap}`}
                         onClick={() => openEditField('username', 'username')}>
                        <img src={username} alt="User" className={style.icon}/>
                        <div className={style.field}>
                            {currentUser.username}
                            <span className={style.fieldHint}>Username</span>
                        </div>
                        <img src={edit} alt="Edit" className={`${style.icon} ${style.editIcon}`}/>
                    </div>

                    <div className={`${style.email} ${style.fieldWrap}`}
                         onClick={() => openEditField('email', 'email')}>
                        <img src={email} alt="Email" className={style.icon}/>
                        <div className={style.field}>
                            {currentUser.email}
                            <span className={style.fieldHint}>Email</span>
                        </div>
                        <img src={edit} alt="Edit" className={`${style.icon} ${style.editIcon}`}/>
                    </div>

                    <div className={`${style.phone} ${style.fieldWrap}`}
                         onClick={() => openEditField('phoneNumber', 'phone number')}>
                        <img src={phone} alt="Phone" className={style.icon}/>
                        <div className={style.field}>
                            +{currentUser.phoneNumber}
                            <span className={style.fieldHint}>Phone number</span>
                        </div>
                        <img src={edit} alt="Edit" className={`${style.icon} ${style.editIcon}`}/>
                    </div>

                    <div className={style.password}>
                        <span className='link'>Change password</span>
                    </div>

                </div>
                {/* //profileData*/}

                {showEdit &&
                <FieldEdit
                    currentUser={currentUser}
                    options={options}
                    setShowEdit={setShowEdit}/>}

                {showNameEdit &&
                <NameEdit currentUser={currentUser}
                          setShowNameEdit={setShowNameEdit}/>}
            </div>
            {/*//profile*/}

            <div className={style.background} onClick={() => toggleBoolean(setShowProfile)}/>
        </div>
    )
}

export default Profile