const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    title: String,
    categories:String,
    content: String,
    like:{ type: Number,
        default: 0 }
});

const postModel = mongoose.model("posts",postSchema);
module.exports=postModel;