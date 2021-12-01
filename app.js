const express = require("express");
const app = express();
const path = require("path");
const Register = require("./model/registers");
require("./db/conn");
//const staticc= path.join(__dirname,"../public");
//app.use(express.static(staticc));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");
app.get("/",(req,res)=>
{
    res.render("index");
});
app.get("/register",(req,res)=>
{
    res.render("register");
});
app.post("/register",async(req,res)=>
{
    try{
       const password= req.body.password;
       const cpassword= req.body.conpassword;
    
    if(password==cpassword)
    {
        const student = new Register({
            email:req.body.email,
            password:req.body.password,
            conpassword:req.body.conpassword,
            name:req.body.name,
            lastname:req.body.lastname
            
        })
        const registered= await student.save((err,data)=>
        {
            if(err)
            {
                return res.status(500).json({
                    status:"error",
                    message:"went wrong"
                })
            }
            console.log(data);
                
        });
            res.redirect("index");
        
        
    }
    else
    {
        res.send("passwords don't match");
    }
}
    catch(err)
    {
        res.status(400).send(error);
    }
   
});
app.listen(2000,()=>
{
    console.log(`server is running at port `);
});