const express = require("express");
const {
  createStudent,
  updateStudentStatus,
  getStudentDetails,
  getStudentDetailFindEmail,
  getAllStudentDetails,
} = require("../controllers/studentController");
const { authenticateToken } = require("../middleware/authentication");
const upload = require("../config/multer");
const   router = express.Router();

router.post("/register-student", upload.single("paymentScreenShot"), createStudent);
router.get("/student/details", getAllStudentDetails);
router.get("/student/detail/:studentId", getStudentDetails);
router.get("/student/:email", getStudentDetailFindEmail);
router.post("/update-student-status", updateStudentStatus);

module.exports = router;
