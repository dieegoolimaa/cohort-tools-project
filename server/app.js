const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors({
  origin: function (origin, callback) {
    // Regex to check if the origin is from http://localhost with port from 5100 to 5299
    const portRegex = /^http:\/\/localhost:(517\d|518\d)$/;
    if (!origin || portRegex.test(origin)) {
      callback(null, true);  // Origin is allowed
    } else {
      callback(new Error('Not allowed by CORS'));  // Origin is not allowed
    }
  }
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});