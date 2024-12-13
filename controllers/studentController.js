const User = require("../models/user");
const Student = require("../models/student");

//Create Student//
exports.createStudent = async (req, res) => {
  const { email, ...rest } = req.body;
  try {
    // Check if a student with the same email already exists and is not archived
    const userExists = await Student.findOne({ email, archived: false });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const paymentScreenShot = req.file?.path;
    const studentData = {
      ...rest,
      email,
      paymentScreenShot,
    };

    const student = new Student(studentData);
    await student.save();

    res
      .status(201)
      .json({ message: "Student created successfully", data: student });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


//Get All Student Details//
exports.getAllStudentDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const studentsInfo = await Student.find({ archived: false })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalStudents = await Student.countDocuments({ archived: false });
    const totalPages = Math.ceil(totalStudents / limit);

    if (!studentsInfo.length) {
      return res.status(404).json({ message: "No Data", data: [] });
    }
    res.status(200).json({
      message: "Student details retrieved successfully",
      data: studentsInfo,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving student details",
      error: error.message,
    });
  }
};

//Get Student Details//
exports.getStudentDetails = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Email Not Available" });
    }

    res.status(200).json({
      message: "Student details retrieved successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving student details",
      error: error.message,
    });
  }
};

//Get Student Details with //
exports.getStudentDetailFindEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const student = await Student.findOne({ email: email, archived: false });
    if (!student) {
      return res.status(404).json({ message: "Email Not Available" });
    }

    res.status(200).json({
      message: "Student details retrieved successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving student details",
      error: error.message,
    });
  }
};

//Update Student Status//
exports.updateStudentStatus = async (req, res) => {
  try {
    const { studentId, status, userId, userName } = req.body;

    console.log(req.body, "req.body");

    if (!studentId || !status || !userId || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        status: status,
        updatedBy: {
          userId: userId,
          name: userName,
          date: new Date(),
        },
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student status updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating student status", error: error.message });
  }
};
