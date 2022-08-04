const User = require("../models/userModel");


exports.auth = (req, res, next) => {
    if (!req.session.user) return res.status(400).json({result: "fail", message: "Not logged in"});
    req.user = req.session.user;
    next();
};
exports.isUser = async (req, res, next) => {
    const sess = req.session.user;
    const user = await User.findById(req.params.id);
    if (sess.username != user.username && sess.username != "admin") return res.status(400).json({result: "fail", message: "Wrong user"});
    if (sess.username != "admin") req.user.username = req.body.username;
    next();
};