//cwd refers to current working directory and you can also write
// const dotenv = require("dotenv").config();
const express = require("express");
require("dotenv").config({ path: `${process.cwd()}/.env` });
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const AppError = require("./utlis/AppError");
// const globalErrorHandler = require("./middleware/globalErrorHandler");

const authRouter = require("./src/routes/AuthRoute");
const testRouter = require("./src/routes/TestRoute");

//assigning the variable app to express
const app = express();

//middleware
app.use(express.json());
app.use(logger("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true })); //to convert the URL-encoded data into a JavaScript object.
app.use(cookieParser()); //can use by parsing req.cookies`

//all routes will be here
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/test", testRouter);

// app.use(async (req, res, next) => {
//   throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
// });

// app.use(globalErrorHandler);

//setting up the port
const PORT = process.env.PORT || 5000;

//listening to the server connection
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
