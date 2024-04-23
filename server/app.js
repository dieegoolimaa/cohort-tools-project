const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Cohort = require("./models/Cohort.model");
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(
  cors({
    origin: function (origin, callback) {
      // Regex to check if the origin is from http://localhost with port from 5100 to 5299
      const portRegex = /^http:\/\/localhost:(517\d|518\d)$/;
      if (!origin || portRegex.test(origin)) {
        callback(null, true); // Origin is allowed
      } else {
        callback(new Error("Not allowed by CORS")); // Origin is not allowed
      }
    },
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html

//Middleware
const MONGODB_URI = "mongodb://127.0.0.1:27017/cohort-tools-project";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    app.listen(PORT, () => {
      console.log(`Server listening on port https://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Error connecting to mongo", err));
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//Get all Cohorts
app.get("/cohorts", async (req, res) => {
  const cohorts = await Cohort.find();
  res.json({ message: "All Good", data: cohorts });
});

//  POST  /cohort route
app.post("/cohort", async (req, res) => {
  const cohortSlug = req.body.cohortName;

  Cohort.create({
    inProgress: req.body.inProgress,
    //need to add format
    cohortSlug: cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
    createdDate: req.body.createdDate,
  })
    .then((createdCohort) => {
      res.status(201).json(createdCohort);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while creating a new Cohort" });
    });
});

//  GET  /cohorts/:id route
app.get("/cohorts/:id", async (req, res) => {
  Cohort.findById(req.params.id)
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while getting a single cohort" });
    });
});

//  PUT  /cohorts/:id route
app.put("/cohorts/:id", async (req, res) => {
  Cohort.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while updating a single cohort" });
    });
});

//  DELETE  /cohorts/:id route
app.delete("/cohorts/:id", async (req, res) => {
  Cohort.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while deleting a single cohort" });
    });
});

//Get all Students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json({ message: "All Good", data: students });
});

//  POST  /student route
app.post("/student", async (req, res) => {
  Cohort.create({
    firstName: req.body.firstName,

    lastName: req.body.lastName,
    cohortName: req.body.cohortName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    cohort: req.body.cohort,
    projects: req.body.projects,
  })
    .then((createdCohort) => {
      res.status(201).json(createdCohort);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while creating a new Cohort" });
    });
});

//  GET  /students/:id route
app.get("/students/:id", async (req, res) => {
  Cohort.findById(req.params.id)
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while getting a single student" });
    });
});

//  PUT  /students/:id route
app.put("/students/:id", async (req, res) => {
  Cohort.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error while updating a single student" });
    });
});

//  DELETE  /students/:id route
app.delete("/students/:id", async (req, res) => {
  Cohort.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error while deleting a single student" });
    });
});

// START SERVER
