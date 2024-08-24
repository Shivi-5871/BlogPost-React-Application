const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blogpost = require("./models/blogPosts");
const app = express();
const port = 3020;

const USERNAME = "shiviAgarwal";
const PASSWORD = "5871shivi";
const DATABASE_NAME = "reactBlogpost";
const dbURI = `mongodb+srv://${USERNAME}:${PASSWORD}@merncluster.qbcns.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority&appName=mernCluster`

mongoose.connect(dbURI)
    .then(() => {
        console.log("Connected to the database");
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Error connecting to the databse");
    });



// MIDDLEWARES AND STATIC FILES WITH EXPRESS    
app.use(morgan("dev"));
app.use(express.json());  
app.set("view engine", "ejs");





app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});


//ROUTES
app.get("/", (req, res) => {
    res.send("Hello");
});



app.get("/blogs", (req, res) => {
    //req.params.id is the ID passed in the request URL as a route parameter.
    //req.params is an object containing route parameters. If you have a route like /blog/:id, then req.params.id will contain the value of :id from the URL.
    Blogpost.find().sort({createdAt: -1})
        .then((result) => {
            console.log("RESULT K ANDR")
            res.send(result);
        })
        .catch((err) => {
            console.log("ERROR AA GAYA");
            res.send("fail");
        })
});




//get by id
app.get("/blogs/id/:id", (req, res) => {
    Blogpost.findById(req.params.id)
        .then((result) => {
            console.log("ID wala result")
            res.send(result);
        })
        .catch(() => {
            console.log("ID wala error")
            res.status(404).send('error');
        });
});



//route to delete a blog
app.delete("/blogs/id/:id",(req, res) => {
    Blogpost.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log("Blog not deleted");
            res.send("fail to delete");
        });
});



//route to create a blog
app.post("/blogs", (req, res) => {
    const blog = req.body;
    Blogpost.create(blog)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send("fail");
        });
});



app.use((req, res) => {
    console.log("DEFAULT ERROR WALA");
    res.status(404).send("error");
});