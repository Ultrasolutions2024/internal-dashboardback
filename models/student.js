const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    // unique: true,
  },

  mobile: {
    type: String,
    required: true,
  },

  dob: {
    type: Date,
    required: true,
  },

  college: {
    type: String,
    required: true,
  },

  degree: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },

  paymentScreenShot: {
    type: Buffer,
    required: false,
  },

  poy: {
    type: Date,
    required: true,
  },
  paymentMode: {
    type: String,
    enum: ["ONLINE", "CASH"],
    default: "ONLINE",
    required: true,
  },
  referral: {
    type: String,
    required: false,
  },
  roles: {
    type: [String],
    enum: ["ADMIN", "EMPLOYEE", "INTERN"],
    default: ["INTERN"],
  },
  status: {
    type: String,
    enum: ["VERIFIED", "NOT_VERIFIED"],
    default: "NOT_VERIFIED",
  },
  archived: {
    type: Boolean,
    default: false,
  },
  updatedBy: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    name: { type: String, required: false },
    date: { type: Date, default: Date.now },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
