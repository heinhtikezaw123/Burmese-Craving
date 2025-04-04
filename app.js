const dotenv = require("dotenv").config();
const express = require('express');
const logger = require("morgan");
const cors = require('cors');
const cookieParser = require('cookie-parser');

//setting up the port
const PORT = process.env.PORT || 5000;

//assigning the variable app to express
const app = express();

//middleware
app.use(express.json());
app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true })) //to convert the URL-encoded data into a JavaScript object.
app.use(cookieParser()) //can use by parsing req.cookies

app.get('/', (req, res) => {
    res.send('API is running and how this is new...');
  });
  

//listening to the server connection
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));