const express = require('express');
const bodyParser = require('body-parser');
const cors =require ('cors');
const cookieParser= require( 'cookie-parser');
const mysql=require('mysql2')
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cookieParser());
app.use(express.json());
// Middleware
app.use(bodyParser.json());
app.use(cors(
  {
      origin: ["http://localhost:3000"],
      methods: ["POST", "GET", "PUT", "DELETE"],
      credentials: true
  }
));

// MySQL Connection
const connection =   mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'manager',
  database: 'assetmanagement'
});

connection.connect();


// Connect to MySQL
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the Asset Management System API!');
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // Use path.join to create an absolute path
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});



const upload = multer({ storage });


app.post('/product', upload.single('productImage'), (req, res) => {
  const { productName, productDescription,variants, variantValues } = req.body;
  const productImage = req.file ? req.file.path : null; // Save the image path

  // Insert product data into MySQL database
   const sql = `INSERT INTO products (productName, productImage, productDescription,variant, variantValues) VALUES (?, ?, ?, ?,?)`;
  const values = [productName, productImage, productDescription, JSON.stringify(variants), JSON.stringify(variantValues)];
  
  console.log('Product image path:', productImage);
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    } else {
      console.log('Product data inserted successfully:', result);
      res.status(200).json({ success: true, message: 'Product submitted successfully' });
    }
  });
});

// Start server
const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
