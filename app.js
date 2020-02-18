let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app =  express();

// App config
mongoose.connect("mongodb://localhost/REST");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

/* Mongoose model config 
  Title
  Image
  Body
  Created 
*/

let blogSchema = new mongoose.Schema({
  title: String,
  image:  String,
  body: String,
  created: {type: Date, default: Date.now}
});

let Blog = mongoose.model("Blog", blogSchema);


// Rest Routes

app.get("/", (req, res)=>{
  res.redirect("/blogs");
})

app.get("/blogs", (req, res)=>{
  Blog.find({}, (err, blogs)=>{
    if(err){
      console.log("ERROR");
    } else{
      res.render("index", {blogs: blogs});
    }
  })
});

app.listen(3000, process.env.PORT, ()=>{
  console.log("This server has begun...")
});
