import React, {useEffect, useState} from 'react';
import style from './ChatProfileBar.module.css'
import {toggleBoolean} from "../../../constants/ChangeDisplayStyle";
import UserProfile from "../../UserProfile/UserProfile";

const ChatProfileBar = (props) => {
    const {secondChatUser, selectedChat, profilePictureColors} = props

    const [showUserProfile, setShowUserProfile] = useState(false)

    // console.log('ChatProfileBar.js secondChatUser', secondChatUser)
    // // useEffect(() => {
    // // }, [])

    return (

        <div className={style.chatProfileBar}>
            {/*<div className={style.profilePictureWrap}>*/}
            <div
                onClick={() => toggleBoolean(setShowUserProfile)}
                className={style.chatProfilePicture}
                style={profilePictureColors[selectedChat]}>

                {secondChatUser &&
                <p className={style.initials}>
                    {((secondChatUser.firstname || '').charAt(0) || '').toUpperCase()}
                    {((secondChatUser.lastname || '').charAt(0) || '').toUpperCase()}
                </p>
                }
                {/*</div>*/}
            </div>

            <div className={style.nameWrap}>
                <span className={style.name}
                    onClick={() => toggleBoolean(setShowUserProfile)}>
                    {secondChatUser.firstname} {secondChatUser.lastname}
                </span>
            </div>

            {showUserProfile &&
            <UserProfile secondUser={secondChatUser}
                         setShowUserProfile={setShowUserProfile}
                         color={profilePictureColors[selectedChat]}
            />}
        </div>
    )
}

export default React.memo(ChatProfileBar)