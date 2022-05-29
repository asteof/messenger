import React, {useState} from 'react';
import style from './ProfileBar.module.css'
import {toggleBoolean} from "../../../constants/ChangeDisplayStyle";
import Profile from "../Menu/Profile/Profile";

const ProfileBar = (props) => {
    const {currentUser, setCurrentUser, profilePictureColors} = props

    const [showProfile, setShowProfile] = useState(false)

    console.log('ProfileBar.js current user', currentUser)

    return (

        <div className={style.profileBar}>
            <div onClick={() => toggleBoolean(setShowProfile)}
                 className={style.profilePicture}
                 style={profilePictureColors[currentUser.id]}>
                {currentUser &&
                <p className={style.initials}>
                    {((currentUser.firstname || '').charAt(0) || '').toUpperCase()}
                    {((currentUser.lastname || '').charAt(0) || '').toUpperCase()}
                </p>
                }
            </div>
            {currentUser &&
            <div className={style.nameWrap}>
                <span onClick={() => toggleBoolean(setShowProfile)} className={style.name}>
                    {currentUser.firstname} {currentUser.lastname}
                </span>
                <div className={style.phoneNumber}>
                    <span>{`+${currentUser.phoneNumber}` || '+380000000000'}</span>
                </div>
            </div>
            }

            {showProfile &&
            <Profile currentUser={currentUser}
                     setCurrentUser={setCurrentUser}
                     setShowProfile={setShowProfile}
                     color={profilePictureColors[currentUser.id]}
            />}
        </div>
    )
}

export default React.memo(ProfileBar)
