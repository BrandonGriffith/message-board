import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import axios from 'axios';


const EditPostForm = () => {
    let [Title, setTitle] = useState("");
    let [Message, setMessage] = useState("");
    let [ImgUrl, setImgUrl] = useState("");
    let [errorHandler, setErrorHandler] = useState({})
    let [post, setPost] = useState({});


    const { _id } = useParams();


    useEffect(() => {
        axios.get(`http://localhost:80/api/v1/posts/${_id}`)
            .then(res => {
                setPost(res.data.post);
                console.log(res);
            })
            .catch(error => console.log(error));
    }, [])


    const createPost = (e) => {
        e.preventDefault();
        let info = { Title, Message, ImgUrl };
        axios.post("http://localhost:80/api/v1/posts", info, { withCredentials: true })
            .then(_response => {
                setTitle("");
                setMessage("");
                setImgUrl("");
                setErrorHandler({});
            })
            .catch(e => { if (e.response.data.error) setErrorHandler(e.response.data.error.errors); });
    }

    return (<>
        <div className='d-flex justify-content-end m-2'>
            <Link to="/dashboard" className='btn btn-info'>Go to dashboard</Link>
        </div>
        <div className='d-flex justify-content-center'>
            <form onSubmit={createPost}>
                <div className="form-group">
                    <label htmlFor="">Post Title</label>
                    <input type="text" className="form-control" onChange={(e) => { setTitle(e.target.value) }} value={Title} />
                    <p className="text-danger">{errorHandler.Title?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Post Message</label>
                    <input type="text" className="form-control" onChange={(e) => { setMessage(e.target.value) }} value={Message} />
                    <p className="text-danger">{errorHandler.Message?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Add ImgUrl</label>
                    <input type="text" className="form-control" onChange={(e) => { setImgUrl(e.target.value) }} value={ImgUrl} />
                    <p className="text-danger">{errorHandler.ImgUrl?.message}</p>
                </div>
                <input type="submit" className='btn btn-success' value="Update Post" />
            </form>
        </div>
    </>);
};
export default EditPostForm;