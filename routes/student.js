var express = require("express");
var router = express.Router();
var {
  getStudents,
  createStudent,
  updateStudent,
  getOneStudent,
  removeStudent,
} = require("../controllers/student");
router.get("/getstudents", getStudents);
router.post("/createstudent", createStudent);
router.get("/getonestudent/:id", getOneStudent);
router.put("/updatestudent/:id", updateStudent);
router.delete("/removestudent/:id", removeStudent);

module.exports = router;
