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

    const searchUser = event =>{
        event.preventDefault()

    }

    return (
        <div className={style.searchBarWrap}>
            <form onSubmit={searchUser}>
                <div className={style.searchBar}>
                    <input type="text"
                           className={style.searchField}
                           value={username}
                           onChange={e => setUsername(e.target.value)}
                           placeholder='Find users by username'/>
                    <span className={style.warning}>At least 3 symbols</span>
                    <span className={style.validationFail}>
                        Only letters, numbers and underscores are accepted
                    </span>
                    <button>
                        <img src="" alt="Search" className={style.searchIcon}/>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Icons;