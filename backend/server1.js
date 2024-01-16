const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cookieParser());
app.use(express.json());

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/assetmanagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Define Product Schema
const productSchema = new mongoose.Schema({
  productName: String,
  productImage: String,
  productDescription: String,
  variants: Object,
  variantValues: Object,
});

const Product = mongoose.model('Product', productSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the Asset Management System API!');
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

app.post('/product', upload.single('productImage'), async (req, res) => {
  const { productName, productDescription, variants, variantValues } = req.body;
  const productImage = req.file ? req.file.path : null;

  // Create a new Product instance
  const newProduct = new Product({
    productName,
    productImage,
    productDescription,
    variants,
    variantValues,
  });

  try {
    // Save the new Product to MongoDB
    await newProduct.save();
    console.log('Product data inserted successfully');
    alert("data saved sucessfully");
    res.status(200).json({ success: true, message: 'Product submitted successfully' });
  } catch (err) {
    console.error('Error inserting data into MongoDB:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
