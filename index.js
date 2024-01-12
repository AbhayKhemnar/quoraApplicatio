//we are making appliction for posting camments 
// using restfull api CRUD

const express=require('express');   //import express
const app=express();
const methodOverride=require('method-override')  //import method override
const port=8080;          

app.listen(port,()=>{
    console.log(`app listing on port : ${port}`)
}); 


app.set("view engine","ejs");                  //setting ejs
app.use(express.static('views'));               //for css

// Set the MIME type for CSS files
app.use('/posts',(req, res, next) => {
    if (req.url.endsWith('.css')) {
        res.type('text/css');
    }
    next();
});

app.use(express.urlencoded({extended:true}));   //encoding data   
app.use(express.json())                        //encoding json data
app.use(methodOverride('_method'))
let posts=[
    {
        name:"abhay",
        comment:"hello all",
        age:21,
        gender:'male'
    },
    {
        name:"akshay",
        comment:"study",
        age:27,
        gender:"male"
    },
    {
        name:"pooja",
        comment:"studying",
        age:25,
        gender:"female"
    }

]
//// Main route /posts :TO READ: GET request api to read all post 

app.get('/posts',(req,res)=>{
    res.render('index.ejs',{posts});
});
    



//// 2. TO POST: POST request to add new post

     //first need to render form to create post  for that ned top use get method

app.get('/posts/new',(req,res)=>{
    res.render('new.ejs')
});

     //now post method to add post

app.post('/posts',(req,res)=>{
    console.log(req.body)
        let {name,age,gender,comment}=req.body
        console.log(req.body)
        posts.push({name:name,comment:comment,age:age,gender:gender})
        res.redirect('/posts')                 //this will redirect to /posts assume it is running line no. 41 agin app.get(/post)
});


  // to read post in detail
  app.get('/posts/:name',(req,res)=>{
    let{name}=req.params
    let post=posts.find((p)=>name===p.name)
    res.render('Show.ejs',{post})
});

//// 3. TO UPDATE : PUT/PATCH Method  
     //here we are updateing single post so we we will use PATCH method
     
     //we will create form to edit but html form can send only get and post method
     //so we need method-override package 
 
    //render form on posts/:name/edit
app.get('/posts/:name/edit',(req,res)=>{
         let {name}= req.params
         let user = posts.find((p)=>name===p.name)
         res.render('edit.ejs',{user})
});

//To update 
app.patch("/posts/:name",(req,res)=>{
    let newComment=req.body.comment
    let {name}=req.params
    posts.forEach((p)=>
    {
        if(p.name===name){
            p.comment=newComment
        }
    })
    res.redirect("/posts")
})

//TO delete : DELECT method
    //create delete form button on post which will send delete method
    //send on route posts/:name
 
    app.delete('/posts/:name',(req,res)=>{
        let name=req.params.name
        posts=posts.filter((p)=>name!=p.name)
        res.redirect('/posts')
    })



