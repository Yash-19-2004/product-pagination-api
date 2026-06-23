import mongoose from "mongoose";

const MONGO_URI="mongodb+srv://Yashjaswal:Yash12345admin@cluster0.damzdoq.mongodb.net/?appName=Cluster0"
mongoose.connect(MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
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

async function seedData(){

  await Product.deleteMany({});

  const products = [];

  const categories =[
    "Books",
    "Electronics",
    "Sports",
    "Fashion"
  ];

  for(let i=1;i<=200000;i++){
    const category=categories[i%categories.length];

    products.push({
      name:`Product ${i}`,
      category:category,
      price:i * 100
    });
  }

  await Product.insertMany(products);

  console.log("Inserted");
}

seedData();


