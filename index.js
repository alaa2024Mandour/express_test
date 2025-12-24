const express = require("express");
const app = express();
port = 3000;


app.use(express.json())
// ## generate your apis using express ##
//NOTE >> in express we write the methods in lower case
// method (url,callback function hold posetional args (req,res,next)=>{})
// -- get --
app.get("/users",(req,res,next)=>{
    // res.status(200).send("Hello Aloaaa") //send function can hold any type of masseges like >> text, json, html, etc
    // res.status(200).send("<h1>Hello Aloaaa</h1>")
    // res.status(200).send({message:"Hello Aloaaa"})

    res.status(200).json({message:"Hello User"}) //json function can only set json 
})


// -- post --
app.post("/users",(req,res,next)=>{
    //send data (req)
    //to call req.body >> you need to put express.json() as a parameter 
    //to avoid call it every time you make an api >> call use methon to fire all requests ☝☝
    //------------------------------------
    //# send data from body #
    //res.status(200).json({message:"Post User",body:req.body}) 
    //------------------------------------

    //# send data from query >> optional not required to send  #
    // any data from queries recived as a string
    //res.status(200).json({message:"Post User",query:req.query}) 
    //------------------------------------

})

app.post("/users/info",
    // middleware >> it is a normal function make a validation 
    (req,res,next)=>{
        if(!req.body.role){
            return res.status(400).json({massage:"role is required"});
        }
        next(); // to go to the next middleware
    },

    // middleware 2
    (req,res,next)=>{
        if(req.body.role == "admin"){
            return res.status(200).json({massage:"Welcome Admin"});
        }
        next(); // to go to the next middleware
    },
    // middleware 3
    (req,res,next)=>{
        return res.status(400).json({massage:"not auth"});
    },
)

// -- delete --
app.delete("/users",(req,res,next)=>{
    res.status(200).json({message:"Delete User"}) 
})

// >>>>> to handel the error of not found url use  --> use OR all method <<<<
//note ==> epress v4 put the url in this format -> "/*"  
// but in express v5 --> "/*Ay 7haga" like "/*demo" , "/*hi", any thing after /*
// and you can delete the url because use function works with any url by default

/* use method usage ==> to make the same thing in any url  */
app.use("{/*demo}",(req,res,next)=>{
    res.status(404).json({message:"404 Oops ... Page Not Fount .."}) 
})

// >> OR all 👇

// app.all("{/*demo}",(req,res,next)=>{
//     res.status(404).json({message:"404 Oops ... Page Not Fount .."}) 
// })

//listn to the server to run it in a special port 
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})