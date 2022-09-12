import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Posts = (props) => {
    const [PostList, setPostList] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts`, { withCredentials: true })
            .then(res => {
                setPostList(res.data.posts);
            })
            .catch(e => console.log(e));
    }, [props.submitHandler])

    const deletePost = (id) => {
        let result = window.confirm("Want to delete?");
        if (result) {
            axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${id}`, { withCredentials: true })
                .then(_res => {
                    props.setSubmitHandler(!props.submitHandler);
                })
                .catch(e => console.log(e));
        }
    };

    PostList.sort((a, b) => {
        let fa = a.createdAt.toLowerCase();
        let fb = b.createdAt.toLowerCase();
        if (fa > fb) return -1;
        if (fa < fb) return 1;
        return 0;
    });

    return (
        <div>
            {
                PostList.map((PostObj) => {
                    return (
                        <div className='d-flex justify-content-center postSize' key={PostObj._id}>
                            <div className="card bg-dark text-light col m-3 postSize">
                                <div className="card-body">
                                    <h3 className="card-title bg-dark text-light">
                                        {PostObj.Title} <span className='afterText'>Posted by</span> {PostObj.User_id?.username}
                                    </h3>
                                    <p className="card-text bg-dark text-light">
                                        {PostObj.ImgUrl !== "" ?
                                            <img src={PostObj.ImgUrl} alt="" className='w-50'
                                                crossOrigin="anonymous" referrerPolicy="no-referrer"
                                            ></img>
                                            : null
                                        }
                                    </p>
                                    <p className="card-text bg-dark text-light">
                                        {PostObj.Message}
                                    </p>
                                    {props.loggedInUser._id === PostObj.User_id._id || props.loggedInUser.username === "admin" ? <>
                                        <button onClick={() => deletePost(PostObj._id)} className='btn btn-danger m-3'>
                                            Delete
                                        </button>
                                        <Link to={`/edit/post/${PostObj._id}`} className='btn btn-info m-3'>
                                            Edit
                                        </Link>
                                    </> : null}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};
export default Posts;