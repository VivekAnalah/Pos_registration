const express = require("express");
const Post = require("../models/post.model")

const app = express.Router();

app.use(express.json());

// ------------- Fetching all data , Pagination , Filter By category, Sort by Dates and search query on product's name -----------

app.get("/", async(req,res) =>{
    let {q, category, sort, limit, page} = req.query

    try{
if(q&&category&&sort&&limit&&page){
if(sort === "desc"){
    let posts = await Post.find({name : {$regex: q, $options : "i"}, category}).sort({postedAt : -1});
    let data = posts.filter((post,i) =>{
        if(i>=limit * (page-1) && i< limit * page){
            return post
        }
    })
    
    return res.status(200).send({status : "ok", data : data, message : "Data fetched Sucessfully!", totalData : posts.length})
}
let posts = await Post.find({name : {$regex: q, $options : "i"}, category}).sort({postedAt : 1});
let data = posts.filter((post,i) =>{
    if(i>=limit * (page-1) && i< limit * page){
        return post
    }
})

return res.status(200).send({status : "ok", data : data, message : "Data fetched Sucessfully!", totalData : posts.length})
}
if(q&&category&&limit&&page){
    let posts = await Post.find({name : {$regex: q, $options : "i"}, category})
    let data = posts.filter((post,i) =>{
        if(i>=limit * (page-1) && i< limit * page){
            return post
        }
    })
    
    return res.status(200).send({status : "ok", data : data, message : "Data fetched Sucessfully!", totalData : posts.length})
}
if(q&&sort&&limit&&page){
if(sort === "desc"){
    let posts = await Post.find({name : {$regex: q, $options : "i"}}).sort({postedAt : -1});
    let data = posts.filter((post,i) =>{
        if(i>=limit * (page-1) && i< limit * page){
            return post
        }
    })
    
    return res.status(200).send({status : "ok", data : data, message : "Data fetched Sucessfully!", totalData : posts.length})
}
let posts = await Post.find({name : {$regex: q, $options : "i"}}).sort({postedAt : 1});
let data = posts.filter((post,i) =>{
    if(i>=limit * (page-1) && i< limit * page){
        return post
    }
})

return res.status(200).send({status : "ok", data : data, message : "Data fetched Sucessfully!", totalData : posts.length})
}
if(category&&sort&&limit&&page){
if(sort === "desc"){
    let posts = await Post.find({category}).sort({postedAt : -1});
    let data = posts.filter((post,i) =>{
        if(i>=limit * (page-1) && i< limit * page){
            return post
        }
    })
    
    return res.status(200).send({status : "ok", data : data, message : "Data fetched Sucessfully!", totalData : posts.length})
}
let posts = await Post.find({category}).sort({postedAt : 1});
let data = posts.filter((post,i) =>{
    if(i>=limit * (page-1) && i< limit * page){
        return post
    }
})

return res.status(200).send({status : "ok", data : data, message : "Data fetched Sucessfully!", totalData : posts.length})
}
if(q&&limit&&page){
    let posts = await Post.find({name : {$regex: q, $options : "i"}})
    let data = posts.filter((post,i) =>{
        if(i>=limit * (page-1) && i< limit * page){
            return post
        }
    })
    
    return res.status(200).send({status : "ok", data : data, message : "Data fetched Sucessfully!", totalData : posts.length})
}
if(category&&limit&&page){
    let posts = await Post.find({category});
    let data = posts.filter((post,i) =>{
        if(i>=limit * (page-1) && i< limit * page){
            return post
        }
    })
    
    return res.status(200).send({status : "ok", data : data, message : "Data fetched Sucessfully!", totalData : posts.length})
}
if(sort&&limit&&page){
    if(sort === "desc"){
        let posts = await Post.find({}).sort({postedAt : -1});
        let data = posts.filter((post,i) =>{
            if(i>=limit * (page-1) && i< limit * page){
                return post
            }
        })
        
        return res.status(200).send({status : "ok", data : data, message : "Data fetched Sucessfully!", totalData : posts.length})
    }
    let posts = await Post.find({}).sort({postedAt : 1});
    let data = posts.filter((post,i) =>{
        if(i>=limit * (page-1) && i< limit * page){
            return post
        }
    })
    
    return res.status(200).send({status : "ok", data : data, message : "Data fetched Sucessfully!", totalData : posts.length})
}
let posts = await Post.find({});
let data = posts.filter((post,i) =>{
    if(i>=limit * (page-1) && i< limit * page){
        return post
    }
})

return res.status(200).send({status : "ok", data : data, message : "Data fetched Sucessfully!", totalData : posts.length})

    }
    catch(e){
       return  res.status(404).send('Bad Request');
    }
})

// ------------- ************************ ----------------------------------------------------------------------------------------

// ------------- On form submit, storing data in backend -----------

app.post("/", async (req,res) =>{
    let {name, description,category, image, location, postedAt, price } = req.body;

    try{
let posts = await Post.create({name, description,category, image, location, postedAt, price });
return res.status(201).send({status : "ok", data : posts, message : "Data Posted Sucessfully!"});
    }
    catch(e){
       return  res.status(404).send('Bad Request');
    }
})
// ------------- ********************************* ----------------------

// ------------- Buying the product should delete the product from the database ------------------
app.delete("/:id", async (req,res) =>{
    let {id } = req.params;

    try{
let posts = await Post.deleteOne({_id : id });
return res.status(200).send({status : "ok", data : posts, message : "Product Bought Sucessfully!"});
    }
    catch(e){
       return  res.status(404).send('Bad Request');
    }
})
// ------------- ********************************* ----------------------------------------------------



module.exports = app


