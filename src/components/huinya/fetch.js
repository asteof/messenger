import React, {useState, useEffect} from 'react';
import axios from "axios";
import style from './test.module.css'

const Fetch = () => {

    let idRand = Math.floor(Math.random() * (100 - 1) + 1)

    // const [posts, setPosts] = useState([])
    const [id, setId] = useState(idRand)
    const [idFromClick, setIdFromClick] = useState(idRand)
    const [post, setPost] = useState({})
    const [postTitle, setPostTitle] = useState('')

    const handleClick = () => {
        setIdFromClick(id)
    }

    useEffect(() => {
        console.log('uf call')
        axios.get(`https://jsonplaceholder.typicode.com/posts/${idFromClick}`)
            .then(response => {
                setPost(response.data)
                setPostTitle(response.data.title)
            })
            .then(() => {
                console.log(`post in 2 then\n${JSON.stringify(post)}`)
                console.log(`post title in 2 then\n${JSON.stringify(postTitle)}`)
            })
            .catch(err => {
                console.log(err)
            })
    }, [idFromClick])

    // console.log(`post\n${JSON.stringify(post)}`)
    // console.log(`post title\n${JSON.stringify(postTitle)}`)

    return (
        <div className={style.wrap}>
            <div className={style.fieldLabelWrapper}>
                <label htmlFor="">number </label>
                <input type="number" id={'numInput'} value={id} onChange={event => setId(event.target.value)}/>
            </div>


            <button type="button" onClick={handleClick} className={style.submitBtn}>go</button>
            <p id='result'>result</p>
            {/*<ul>*/}
            {/*    {*/}
            {/*        posts.map(post => <li key={post.id}>{post.id} {post.title}</li>)*/}
            {/*    }*/}
            {/*</ul>*/}

            <div>{post.id}. {post.title}</div>
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

export default Fetch