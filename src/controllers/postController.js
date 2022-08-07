const Post = require("../models/postModel");

exports.getAllPosts = async (_req, res) => {
    try { 
        const posts = await Post.find().populate("User_id");
        res.status(200).json({
            result: "success",
            results: posts.length,
            posts,
        });
    }
    catch (e) { res.status(400).json({result:"fail", error: e}); console.log(e); };
};
exports.getOnePost = async (req, res) => {
    try { 
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            result: "success",
            post,
        });
    }
    catch (e) { res.status(400).json({result:"fail", error: e}); console.log(e); };
};
exports.createPost = async (req, res) => {
    try { 
        console.log(req.session);
        req.body.User_id = req.session.user._id;
        const post = await Post.create(req.body);
        res.status(200).json({
            result: "success",
            post,
        });
    }
    catch (e) { res.status(400).json({result:"fail", error: e}); console.log(e); };
};
exports.updatePost = async (req, res) => {
    try { 
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            result: "success",
            post,
        });
    }
    catch (e) { res.status(400).json({result:"fail", error: e}); console.log(e); };
};
exports.deletePost = async (req, res) => {
    try { 
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            result: "success",
            data: null,
        });
    }
    catch (e) { res.status(400).json({result:"fail", error: e}); console.log(e); };
};