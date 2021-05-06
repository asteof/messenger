import React, {useEffect, useState} from 'react';
import style from './ProfileBar.module.css'
import RandomColor from "../../constants/RandomColor";
import {toggleBoolean} from "../../constants/ChangeDisplayStyle";
import Profile from "../Profile/Profile";

const ProfileBar = (props) => {
    const {currentUser, setCurrentUser} = props
    const [color, setColor] = useState({})

    const [showProfile, setShowProfile] = useState(false)

    console.log('ProfileBar.js current user', currentUser)
    useEffect(() => {
        setColor(RandomColor)
    }, [])

    return (

        <div className={style.profileBar}>
            {/*<div className={style.profilePictureWrap}>*/}
            <div onClick={() => toggleBoolean(setShowProfile)}
                 className={style.profilePicture}
                 style={color}>
                {currentUser &&
                <p className={style.initials}>
                    {((currentUser.firstname || '').charAt(0) || '').toUpperCase()}
                    {((currentUser.lastname || '').charAt(0) || '').toUpperCase()}
                </p>
                }
                {/*</div>*/}
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
                     color={color}
            />}
        </div>
    )
}

export default React.memo(ProfileBar)