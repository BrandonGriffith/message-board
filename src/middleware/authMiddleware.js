const User = require("../models/userModel");
const Post = require("../models/postModel");


exports.auth = (req, res, next) => {
    if (!req.session.user) return res.status(400).json({result: "fail", message: "Not logged in"});
    req.user = req.session.user;
    next();
};
exports.isUser = async (req, res, next) => {
    const sess = req.session.user;
    let user = sess;
    if (req.params.id) user = await User.findById(req.params.id);
    if (sess.username != user.username && sess.username != "admin") return res.status(400).json({result: "fail", message: "Wrong user"});
    if (sess.username != "admin" && req.body.username) req.user.username = req.body.username;
    next();
};
exports.isPostOwner = async (req, res, next) => {
    const sess = req.session.user;
    let post = await Post.findById(req.params.id);
    if (sess._id != post.User_id && sess.username != "admin") return res.status(400).json({result: "fail", message: "Wrong user"});
    next();
};
// exports.confirmPass = (req, res, next) => {
//     if (!req.body.confirmPass) return res.status(400).json({result: "fail", message: "Must have confirmPass"});
//     if (req.body.password !== req.body.confirmPass) return res.status(400).json({result: "fail", message: "Passwords must match"});
//     next();
// };
