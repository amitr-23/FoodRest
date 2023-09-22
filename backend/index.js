const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()


const app = express()
app.use(cors())
app.use(express.json({limit : "10mb"}))

const PORT = process.env.PORT || 8080

//mongoose conn
//console.log(process.env.MONGODB_URL )
mongoose.set('strictQuery', false);
mongoose
.connect(process.env.MONGODB_URL)
.then(()=> console.log("connenct to database"))
.catch((err)=>console.log(err))

//schema
const userSchema = mongoose.Schema({
    firstname : String,
    lastname : String,
    email : {
        type : String,
        unique : true,

    },
    password : String,
    confirmPassword : String,
    image : String
})

//model

const userModel = mongoose.model("user", userSchema)



app.get("/", async(req,res) => {
    res.send("server is running")
})

/*app.post("/signup",async(req,res) => {
    console.log(req.body)
    const {email} = req.body
    userModel.findOne({email : email}, (err,result) => {
        console.log(result)
        console.log(err)
        if(result){
            res.send({message : "email id is already register"})
        }
        else{
            const data = userModel(req.body)
            const save = data.save()
            res.send({message : "successfully sign up"})
        }
    })
})*/


app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
  
    try {
      const result = await userModel.findOne({ email: email });
      console.log(result);
      if (result) {
        res.send({ message: "email id is already registered", alert : false });
      } else {
        const data = userModel(req.body);
        const save = await data.save();
        res.send({ message: "successfully signed up", alert : true });
      }
    } catch (err) {
      console.log(err);
      res.send({ message: "an error occurred" });
    }
  });


  /*app.post("/login", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
   

     userModel.findOne({email : email},(err,result) =>{
      if(result){
       
        const dataSend = {
          _id:result._id,
          firstname:result.firstname,
          lastname:result.lastname,
          email:result.email,
          image:result.image,
        }
        console.log(dataSend)
        res.send({message : "login is successfully" , alert : true,data : dataSend})

      }
      else{
        res.send({message : "email is not available ,please sign up" , alert : false})
      }
    })
     });*/


      app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  try {
    const result = await userModel.findOne({ email: email });
    if (result) {
      const dataSend = {
        _id: result._id,
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email,
        image: result.image,
      };
      console.log(dataSend);
      res.send({
        message: "login is successfully",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: "email is not available, please sign up",
        alert: false,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//product section

const schemaProduct = mongoose.Schema({
  name :String,
    category : String,
    image : String,
    price : String,
    description : String

});

const productModel = mongoose.model("product",schemaProduct )

// save product in database api
app.post("/uploadProduct",async(req,res) =>{
  console.log(req.body)
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({message : "upload successfully"})
})


//

app.get("/product",async(req,res) => {
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})

   
app.listen(PORT,() => console.log("server is running at port : " + PORT))

