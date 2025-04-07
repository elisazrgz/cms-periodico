const express = require('express');
require('dotenv').config(); 
const connectDB = require('./src/utils/db_mongo'); 
const router = require('./src/api/routers/routes'); 
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const server = express();
server.use(express.json());

server.use(cors({
  origin: "*",
  credentials: true
}));

const PORT = process.env.PORT;

server.use('/', router);

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});