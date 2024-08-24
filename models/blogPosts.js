const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogpost = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {timestamps: true});

const blogpostCollectionname = "blogposts";
const Blogpost = mongoose.model("Blogpost", blogpost, blogpostCollectionname);

module.exports = Blogpost;