require("dotenv").config();
const express = require("express");
const indexRoutes = require("./routes/index.routes");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


require("./config")(app);

// 👇 Start handling routes here

app.use("/api", indexRoutes);

module.exports = app;
