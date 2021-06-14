var express = require('express');
var router = express.Router();

var mongoose=require("mongoose");

const postModel=require("../models/post.js");

/* GET users listing. */
router.get('/list', function(req, res, next) {
  
  postModel.find(function(err,postList){
    if(err)
    {
      res.send({status: 500 , message: "unable to display posts"});
    }
    else{
      const recordCount=postList.length;
      res.send({status: 200 , recordCount: recordCount , results: postList});
    }
  });

});

// Create new post
router.post('/add', function(req, res, next) {

  let title=req.body.title;
  let categories=req.body.categories;
  let content=req.body.content;
  let like=req.body.like;

  let postobj= new postModel({
    title: title,
    categories: categories,
    content: content,
    like: like
  });
  postobj.save(function(err,postobj){
    if(err)
    {
      res.send({status: 500 , message: "unable to add post"});
    }
    else{
      res.send({status: 200 , message: "added successfully" , postDetails: postobj});
    }
  });
});




//  Get Details of a Specific customer
router.get('/view/:id', function(req, res, next) {
  const id=req.params.id;

  postModel.findById(id,function(err,postResponse){
    if(err)
    {
      res.send({status: 500 , message: "unable to find posts"});
    }
    else{
      res.send({status: 200 , results: postResponse});
    }
  });

  
});

// update existing post by id
router.put('/update/:id', function(req, res, next) {
  
  const id=req.params.id;

  let title=req.body.title;
  let categories=req.body.categories;
  let content=req.body.content;
  let like=req.body.like;

  let postobj= {
    title: title,
    categories: categories,
    content: content,
    like: like
  };

  postModel.findByIdAndUpdate(id, postobj, function(err,postResponse){
    if(err)
    {
      res.send({status: 500 , message: "unable to update posts"});
    }
    else{
      res.send({status: 200 ,message: "post updated successfully" , results: postobj});
    }
  });

});

router.delete('/delete/:id', function(req, res, next) {
  
  const id=req.params.id;

  postModel.findByIdAndDelete(id, function(err,postResponse){
    if(err)
    {
      res.send({status: 500 , message: "unable to delete posts"});
    }
    else{
      res.send({status: 200 ,message: "post deleted successfully" , results: postResponse});
    }
  });

});



module.exports = router;
