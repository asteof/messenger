import React, {useState} from 'react';
import style from './Icons.module.css'


function Icons(props) {

    const {} = props
    // console.log('Chats.js current user', currentUser)
    const [username, setUsername] = useState('')

    // let chats = chatsData
    //     .sort((a, b) => {
    //         const timeA = a.modifyDate;
    //         const timeB = b.modifyDate;
    //         return timeB - timeA
    //     })
    //     .map(chat => {
    //             //get second user of chat to display his name
    //             //id of that user != id of current user
    //             const secondUser = chat.chatUsers.find(user => user.id !== currentUser.id);
    //
    //             const lastMessage = lastMessages.find(message => message.chatId === chat.chatId);
    //
    //             // console.log(lastMessage)
    //             return (
    //                 <Chat key={chat.chatId}
    //
    //                       secondUser={secondUser}
    //                       currentUser={currentUser}
    //                       setSecondChatUser={setSecondChatUser}
    //                       chatId={chat.chatId}
    //                       selectedChat={selectedChat}
    //                       setSelectedChat={setSelectedChat}
    //                       setIsLoggedIn={setIsLoggedIn}
    //                       setMessages={setMessages}
    //                       setReceivedMessage={setReceivedMessage}
    //                       receivedMessage={receivedMessage}
    //                       lastMessage={lastMessage}
    //                       profilePictureColors={profilePictureColors}
    //                       setProfilePictureColors={setProfilePictureColors}
    //                 />
    //             )
    //         }
    //     )
    // // console.log(chats)

    // const searchUser = event =>{
    //     event.preventDefault()
    //
    // }

    return (
        <div className={style.icons}>
               <div>
                   <img src="" alt=""/>
               </div>
        </div>
    )
}

export default Icons;