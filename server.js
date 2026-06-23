import express from "express";
import mongoose from "mongoose";

const app= express();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const productSchema = new mongoose.Schema({
  name:String,
  category:String,
  price:Number
},
{
  timestamps:true
});

const Product = mongoose.model("Product",productSchema);

app.get("/products",async(req,res) => {

  const {category,cursor} = req.query;

  let query= {};

  if(category){
    query.category=category;
  }

  if(cursor){
    query._id={
      $lt:cursor
    };
  }

  const products= await Product.find(query)
  .sort({_id:-1})
  .limit(20);

  res.json(products);

});

app.listen(5000,() => {
  console.log("Server running on port 5000");
});

