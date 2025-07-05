const cors = require("cors");
const mongoose= require('mongoose')
const express= require('express')
mongoose.connect("mongodb://localhost:27017/formdata", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const userschema= new mongoose.Schema({
name:{
    type:  String,
    required: true
},
salary:{
    type:  Number,
    required: true
},
city:{
    type:  String,
    required: true
},
});
const User = mongoose.model('User',userschema)
const app=express()
app.use(cors({
  origin: 'http://127.0.0.2:5500',
}));
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('server is running')
})
app.post('/submit',async(req,res)=>{
    try {
    const { name, salary, city } = req.body;
    const newUser = new User({ name, salary, city });
    await newUser.save();
    res.json({ message: '✅ Data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: '❌ Failed to save data', details: error });
  }
})
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🔊 Server running at http://localhost:${PORT}`);
});