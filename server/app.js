require("dotenv").config();
const express = require("express");
const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

require("./config")(app);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

// 👇 Start handling routes here
app.use("/api", indexRoutes);

app.use("/auth", authRoutes);

module.exports = app;
