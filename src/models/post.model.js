const {Schema, model}=require("mongoose");

const PostSchema = new Schema({
    name: {type : String},
		description : {type : String},
		category : {type : String},
		image : {type : String},
		location : {type : String},
		postedAt : {type : String},
		price : {type : Number}
})

const Post = model("post", PostSchema)

module.exports = Post