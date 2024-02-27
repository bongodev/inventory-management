require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const productRouter = require('./routes/productRoutes');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(bodyParser.json());

connectDB();

app.use('/api', productRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
