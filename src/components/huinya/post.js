import React, {useState} from 'react';
import axios from "axios";
import style from './test.module.css'

const Post = () => {


    const [response, setResponse] = useState({
        config: {},
        data: {},
        status: 0,
        error: null
    })
    const [post, setPost] = useState({
        userId: 8,
        title: '',
        body: ''
    })

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(post)
        axios.post(`https://jsonplaceholder.typicode.com/posts/`, post)
            .then(res => {
                console.log(res)
                setResponse(prevResponse =>({...prevResponse, 'config': res.config}))
                setResponse(prevResponse =>({...prevResponse, 'data': res.data}))
                setResponse(prevResponse =>({...prevResponse, 'status': res.status}))
            }).catch(err => {
            console.log(err)
            setResponse(prevResponse =>({...prevResponse, 'error': err}))
        })
    }

    const changeHandle = (e) => {
        setPost(prevPost => ({...prevPost, [e.target.id]: e.target.value}))
    }


    //
    const {userId, title, body} = post

    return (
        <div className={style.wrap}>
            <form action="" onSubmit={submitHandler}>

                <div className={style.fieldLabelWrapper}>
                    <label htmlFor="">UserId</label>
                    <input type="number" id={'userId'} value={userId}
                           onChange={changeHandle}/>
                </div>
                <div className={style.fieldLabelWrapper}>
                    <label htmlFor="">Title</label>
                    <input type="text" id={'title'} value={title}
                           onChange={changeHandle}/>
                </div>
                <div className={style.fieldLabelWrapper}>
                    <label htmlFor="">Body</label>
                    <input type="text" id='body' value={body}
                           onChange={changeHandle}/>
                </div>

                <button type="submit" className={style.submitBtn}>goo</button>
            </form>

            <div className={style.hui2}>Post <code>{JSON.stringify(post)}</code></div>
            <div className={style.hui2}>Config <code>{JSON.stringify(response.config)}</code></div>
            <div className={style.hui2}>Data <code>{JSON.stringify(response.data)}</code></div>
            <div className={style.hui2}>Status {response.status}</div>
            <div className={style.hui2}>Error {JSON.stringify(response.error)}</div>
        </div>
    )
}
//
// <div className={style.fieldLabelWrapper}>
//     <label htmlFor="">link </label>
//     <select name="" id="linkInput" value={id} onChange={event => setId(event.target.value)}>
//         <option value="posts">posts</option>
//         <option value="todos">todos</option>
//     </select>
// </div>

export default Post