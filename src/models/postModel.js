const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: [true, "must have a title"],
        minlength: [1, "title is too short"]
    },
    Message: {
        type: String, 
        required: [true, "must have a message"],
        minlength: [1, "message is too short"]
    },
    Likes: {
        type: Number,
        default: 0
    },
    ImgUrl: {
        type: String
    },
    User_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "must have a User_id"],
        ref: "User"
    },
    },
    {timestamps:true}
);
const Post = mongoose.model("Post", postSchema);
module.exports = Post;