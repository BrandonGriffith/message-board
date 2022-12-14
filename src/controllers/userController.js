const User = require("../models/userModel");
const bcrypt = require("bcryptjs");


exports.signUp = async (req, res) => {
    try {
        let user = req.body;
        if (user["password"] == user["confirmPass"] && user.password.length >= 8){
            user["password"] = await bcrypt.hash(user["password"], 12);
            user['confirmPass'] = user["password"];
        };
        const newUser = await User.create(user);
        const sess = req.session;
        sess.user = newUser;
        res.status(200).json({
            result: "success",
            data: {
                username: sess.user.username,
                id: sess.user._id,
            },
        })
    }
    catch (e) { res.status(400).json({result:"fail", error:e}) };
};
exports.getAllUsers = async (_req, res) => {
    try { 
        const users = await User.find();
        res.status(200).json({
            result: "success",
            results: users.length,
            data: {
                users: users.length,
            },
        });
    }
    catch (e) { res.status(400).json({result:"fail", error: e}); };
};
exports.getOneUser = async (req, res) => {
    try { 
        const user = await User.findById(req.params.id);
        res.status(200).json({
            result: "success",
            data: {
                username: user.username,
                id: user._id,
            },
        });
    }
    catch (e) { res.status(400).json({result:"fail", error: e}); };
};
exports.updateUser = async (req, res) => {
    try {
        if (req.body["password"]){
            req.body["password"] = await bcrypt.hash(req.body["password"], 12);
        };
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            result: "success",
            data: {
                username: user.username,
                id: user._id,
            },
        });
    }
    catch (e) { res.status(400).json({result:"fail", error: e}); };
};
exports.deleteUser = async (req, res) => {
    try { 
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            result: "success",
            data: null,
        });
    }
    catch (e) { res.status(400).json({result:"fail", error: e}); };
};
exports.login = async (req, res) => {
    try { 
        const username = await req.body["username"];
        const user = await User.findOne({username});
        if (!user){
            return res.status(400).json({
                result: "fail",
                message: "username not found",
            });
        };
        const correctPass = await bcrypt.compare(req.body["password"], user.password);
        if (!correctPass){
            return res.status(400).json({
                correctPass,
                result: "fail",
                message: "password is not correct",
            });
        };
        const sess = req.session;
        sess.user = user;
        res.status(201).json({
            correctPass,
            result: "success, you have logged in",
            data: {
                username: sess.user.username,
                id: sess.user._id,
            },
        });
    }
    catch (e) { res.status(400).json({result:"fail", error: e}); };
};
exports.getLoggedInUser = async (req, res) => {
    const user = req.session.user;
    res.status(200).json({
        result:"success",
        user,
    })
};
exports.logout = (_req, res) => {
    res.clearCookie("sessionCookie");
    res.sendStatus(200);
};