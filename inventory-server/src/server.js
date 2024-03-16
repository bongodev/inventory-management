require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(bodyParser.json());

connectDB();

app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api', productRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
