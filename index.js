const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();
//Connecting to DB
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true },() => console.log('Conected to DB!'));

app.use(express.json());




app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
//Setting server on port 3000
app.listen(3000, () => console.log('Server running'))
