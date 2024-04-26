const { Schema, model, Types } = require("mongoose");

// CREATE A SCHEMA
const studentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    linkedinUrl: { type: String },

    languages: { type: [String] },
    program: { type: String, required: true },
    background: { type: String },
    image: { type: String },

    cohort: { type: Schema.Types.ObjectId, ref: "Cohort" },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    //projects: { type: [mongoose.Schema.Types.ObjectId], ref: "Project" },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamp: true,
  }
);

// CREATE A MODEL
const Student = model("Student", studentSchema);

// EXPORT THE MODEL
module.exports = Student;
