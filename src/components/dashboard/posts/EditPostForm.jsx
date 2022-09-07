import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import axios from 'axios';


const EditPostForm = () => {
    let [errorHandler, setErrorHandler] = useState({});
    let [postInfo, setPostInfo] = useState({});
    const { _id } = useParams();


    useEffect(() => {
        axios.get(`http://localhost:80/api/v1/posts/${_id}`)
            .then(res => {
                setPostInfo(res.data.post);
                console.log(res);
            })
            .catch(e => console.log(e));
    }, [_id])


    const changeHandler = (e) => {
        setPostInfo({
            ...postInfo,
            [e.target.name]: [e.target.value]
        })
    }


    const updatePost = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:80/api/v1/posts/${_id}`, postInfo, { withCredentials: true })
            .then(res => {
                console.log(res);
            })
            .catch(e => { if (e.response.data.error) setErrorHandler(e.response.data.error.errors); });
    }

    return (<>
        <div className='d-flex justify-content-end m-2'>
            <Link to="/dashboard" className='btn btn-info'>Go to dashboard</Link>
        </div>
        <div className='d-flex justify-content-center'>
            <form onSubmit={updatePost}>
                <div className="form-group">
                    <label htmlFor="">Post Title</label>
                    <input type="text" name="Title" className="form-control" onChange={(e) => { changeHandler(e) }} value={postInfo.Title} />
                    <p className="text-danger">{errorHandler.Title?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Post Message</label>
                    <input type="text" name="Message" className="form-control" onChange={(e) => { changeHandler(e) }} value={postInfo.Message} />
                    <p className="text-danger">{errorHandler.Message?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Add ImgUrl</label>
                    <input type="text" name="ImgUrl" className="form-control" onChange={(e) => { changeHandler(e) }} value={postInfo.ImgUrl} />
                    <p className="text-danger">{errorHandler.ImgUrl?.message}</p>
                </div>
                <input type="submit" className='btn btn-success' value="Update Post" />
            </form>
        </div>
    </>);
};
export default EditPostForm;