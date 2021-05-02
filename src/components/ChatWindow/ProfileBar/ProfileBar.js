import React, {useEffect, useState} from 'react';
import style from './ProfileBar.module.css'
import RandomColor from "./RandomColor";
import {toggleBoolean} from "./ChangeDisplayStyle";
import Profile from "../Profile/Profile";

const ProfileBar = (props) => {
    const currentUser = props.currentUser
    const [color, setColor] = useState({})

    const [showProfile, setShowProfile] = useState(false)

    console.log('ProfileBar.js current user', currentUser)
    useEffect(() => {
        setColor(RandomColor)
    }, [])

    return (

        <div className={style.profileBar}>
            <div onClick={() => toggleBoolean(setShowProfile)}
                 className={style.profilePicture}
                 style={color}>
                {currentUser !== {} &&
                <p className={style.initials}>
                    {((currentUser.firstname || '').charAt(0) || '').toUpperCase()}
                    {((currentUser.lastname || '').charAt(0) || '').toUpperCase()}
                </p>
                }
            </div>
            <div className={style.fullname}            >
                {currentUser.firstname} {currentUser.lastname}
                <div className={style.phoneNumber}>
                    <span>{`+${currentUser.phoneNumber}` || '+380000000000'}</span>
                </div>
            </div>

            {showProfile &&
            <Profile currentUser={currentUser}
                     setShowProfile={setShowProfile}
                     color={color}
            />}
        </div>
    )
}

export default ProfileBar