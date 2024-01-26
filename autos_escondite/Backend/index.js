const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/auto_escondite");
const userSchema=new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});
const adminSchema=new mongoose.Schema({
  adminname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});
const royalSchema=new mongoose.Schema({
  rank: { type: String, required: true },
  key: { type: String, required: true },
});
const carSchema=new mongoose.Schema({
  make:{ type: String, required: true },
  model:{ type: String, required: true },
  type:{ type: String, required: true },
  featured:{ type: Boolean, required: true },
  year:{ type: Number, required: true },
  seats:{ type: Number, required: true },
  mileage:{ type: Number, required: true },
  price:{ type: Number, required: true},
  url:{ type: String, required: true },
  reviews:{
    number:{ type: Number, default: 0 },
    rating:{ type: Number, default: 0.0 },
    comments:{ type:[String],default: [] }
  }
});

const User=mongoose.model("User", userSchema);
const Admin=mongoose.model("Admin", adminSchema);
const Royal=mongoose.model("royal", royalSchema);
const Car=mongoose.model("Car", carSchema);


// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../Frontend/src/content/images/'); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
  },
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
// app.use('../Frontend/src/content/images', express.static('images'));

// API endpoint for uploading an image
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    const imageUrl = `../content/images/${req.file.filename}`; // Save the image URL

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post("/user/newsignup", async (req,res) => {
  try {
    const userData=req.body;
    const userExisted=await User.findOne({email:userData.email});
    if(userExisted){
      console.log(userExisted);
      res.json({message:"User with same email"})
    }else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    console.log(userData);
    const newUser=new User(userData);
    await newUser.save();
    res.json({message:"Signup Successfull"});
    }
  } catch (error) {
    console.error("Error", error);
    res.json({message:"Server Side Error"});
  }
});
app.post("/user/signin", async (req,res) => {
  try {
    const userData=req.body;
    const userExisted=await User.findOne({email:userData.email});
    if(userExisted){
      const verified=await bcrypt.compare(userData.password, userExisted.password);
      if(verified){
        res.json({message: "verified"});
      }else {
        res.json({message: "ip"});
      }
    }else {
      res.json({message: false});
    }
  } catch (error) {
    console.error("Error", error);
    res.json({message:"Server Side Error"});
  }
});
app.post("/admin/newsignup", async (req,res) => {
  try {
    const adminData=req.body;
    const royal=await Royal.findOne({rank: "royal"});
    if(royal){
      if(adminData.key === royal.key){
        const adminExisted=await Admin.findOne({email:adminData.email});
        if(adminExisted){
          console.log(adminExisted);
          res.json({message:"Admin with same email"})
        }else {
          const hashedPassword = await bcrypt.hash(adminData.password, 10);
        adminData.password = hashedPassword;
        console.log(adminData);
        const newAdmin=new Admin(adminData);
        await newAdmin.save();
        res.json({message: "Signup Successfull"});
        }
      }else {
        res.json({message: "You can't signup as an admin"});
      }
    }else {
    res.json({message:"Server Side Error"});
    }
  } catch (error) {
    console.error("Error", error);
    res.json({message:"Server Side Error"});
  }
});
app.post("/admin/signin", async (req,res) => {
  try {
    const adminData=req.body;
    const adminExisted=await Admin.findOne({email:adminData.email});
    if(adminExisted){
      const verified=await bcrypt.compare(adminData.password, adminExisted.password);
      if(verified){
        res.json({message: "verified"});
      }else {
        res.json({message: "ip"});
      }
    }else {
      res.json({message: false});
    }
  } catch (error) {
    console.error("Error", error);
    res.json({message:"Server Side Error"});
  }
});
app.post("/admin/uploadcar", async (req,res) => {
  try {
    const carData=req.body;
    var boolian=false;
    if(carData.featured === "yes"){
      boolian=true;
      carData.featured=boolian;
    }else{
      carData.featured=boolian;
    }
    console.log(carData);
    const newCar=new Car(carData);
    await newCar.save();
    res.json({message: "Car Uploaded Successfully"});
  } catch (error) {
    console.error("Error", error);
    res.json({message: "Server Side Error"});
  }
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});