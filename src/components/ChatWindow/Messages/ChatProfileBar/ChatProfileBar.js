import React, {useState} from 'react';
import style from './ChatProfileBar.module.css'
import {toggleBoolean} from "../../../constants/ChangeDisplayStyle";
import UserProfile from "../../Menu/UserProfile/UserProfile";

const ChatProfileBar = (props) => {
    const {secondUser, profilePictureColors, chatId, setChatIsDeleted} = props

    const [showUserProfile, setShowUserProfile] = useState(false)

    return (
        <div className={style.chatProfileBar}>
            <div onClick={() => toggleBoolean(setShowUserProfile)}
                 className={style.chatProfilePicture}
                 style={profilePictureColors[secondUser.id]}>

                {secondUser &&
                <p className={style.initials}>
                    {((secondUser.firstname || '').charAt(0) || '').toUpperCase()}
                    {((secondUser.lastname || '').charAt(0) || '').toUpperCase()}
                </p>
                }
            </div>

            <div className={style.nameWrap}>
                <span className={style.name}
                      onClick={() => toggleBoolean(setShowUserProfile)}>
                    {secondUser.firstname} {secondUser.lastname}
                </span>
            </div>

            {showUserProfile &&
            <UserProfile user={secondUser}
                         setChatIsDeleted={setChatIsDeleted}
                         setShowUserProfile={setShowUserProfile}
                         chatId={chatId}
                         color={profilePictureColors[secondUser.id]}
            />}
        </div>
    )
}

export default React.memo(ChatProfileBar)