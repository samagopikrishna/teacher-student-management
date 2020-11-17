const express = require("express");
var Teacher = require("../modals/teacherModel.js");
var Student = require("../modals/studentModal.js");

const teachers = require("../modals/Teachers");

const TeachersRouter = express.Router();

const getAllteachers = async () => {
  const result = await Teacher.findAll();
  // TODO: Find a better way to get plain json
  return JSON.parse(JSON.stringify(result));
};

const getAllStudents = async () => {
  const result = await Student.findAll();
  // TODO: Find a better way to get plain json
  return JSON.parse(JSON.stringify(result));
};

const getTeacherById = async id => {
  const result = await Teacher.findByPk(id);

  // TODO: Find a better way to get plain json
  return JSON.parse(JSON.stringify(result));
};

const getStudentById = async id => {
  console.log("aaaaaaaaaaaaaaaaa");
  console.log(id);
  console.log("aaaaaaaaaaaaaaaaa");
  const result = await Student.findAll({
    where: {
      id: id
    }
  });

  console.log(JSON.parse(JSON.stringify(result)));

  return JSON.parse(JSON.stringify(result));
};

const getStudentByTeacherId = async id => {
  console.log("aaaaaaaaaaaaaaaaa");
  console.log(id);
  console.log("aaaaaaaaaaaaaaaaa");
  const result = await Student.findAll({
    where: {
      teacherId: id
    }
  });

  console.log(JSON.parse(JSON.stringify(result)));

  return JSON.parse(JSON.stringify(result));
};

/*router methods  for entire teachers*/

TeachersRouter.get("/", async (req, res) => {
  try {
    res.status(200).json({
      data: await getAllteachers()
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server error");
  }
});

// TeachersRouter.get("/", (req, res) => {
//   res.status(200).json({
//     message: "successfully retrived all the teachers details !!!",
//     data: teachers
//   });
// });

TeachersRouter.post("/", async (req, res) => {
  // var id = teachers.length + 1;
  // console.log(id);
  // console.log(req.body);
  // teachers.push({ id, ...req.body, students: [] });
  // // var arr = Object.values(req.body);
  // // for (var i = 0; i < arr.length; i++) {
  // //   teachers.push({ ...arr[i] });
  // // }

  try {
    const result = await Teacher.create(req.body);
    console.log(result.get());
    // const { id } = result.get();
    // studentSeeder(id);
  } catch (e) {
    console.error(e);
  }

  res.status(200).json({
    message: "teacher added successfully !!!",
    data: req.body
  });
});

TeachersRouter.post("/student", async (req, res) => {
  // var id = teachers.length + 1;
  // console.log(id);
  // console.log(req.body);
  // teachers.push({ id, ...req.body, students: [] });
  // // var arr = Object.values(req.body);
  // // for (var i = 0; i < arr.length; i++) {
  // //   teachers.push({ ...arr[i] });
  // // }

  try {
    const result = await Student.create(req.body);
    console.log("kkkkkkkkkkkkkkkk");
    console.log(result.get());
    console.log("kkkkkkkkkkkkkkkk");
    // const { id } = result.get();
    // studentSeeder(id);
  } catch (e) {
    console.error(e);
  }

  res.status(200).json({
    message: "student added successfully !!!",
    data: req.body
  });
});

TeachersRouter.delete("/", (req, res) => {
  teachers.splice(0, teachers.length);
  res.status(200).send("All teachers deleted successfully !!!");
});

//TeachersRouter.put();

/*routes method for individual teacher*/
TeachersRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  const studentId = parseInt(id);
  let originalStudentIndex;
  for (var i = 0; i < teachers.length; i++) {
    if (teachers[i].id === studentId) originalStudentIndex = i;
  }
  if (originalStudentIndex != undefined) {
    res.status(200).json({
      message: "teacher deails retrived successfully",
      data: teachers[originalStudentIndex]
    });
  } else res.status(400).send("Teacher id is invalid");
});

TeachersRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  const studentId = parseInt(id);
  let originalStudentIndex;
  for (var i = 0; i < teachers.length; i++) {
    if (teachers[i].id === studentId) originalStudentIndex = i;
  }
  if (originalStudentIndex != undefined) {
    teachers.splice(originalStudentIndex, 1);
    res.status(200).send("teacher has been deleted successfully");
  } else res.status(400).send("Teacher id is invalid");
});

// TeachersRouter.put("/:id", (req, res) => {
//   var { id } = req.params;

//   // const studentId = parseInt(id);
//   let originalStudentIndex = parseInt(id);
//   // for (var i = 0; i < teachers.length; i++) {
//   //   if (teachers[i].id === studentId) originalStudentIndex = i;
//   // }
//   if (originalStudentIndex != undefined) {
//     let originalStudent = teachers[originalStudentIndex];
//     let newStudent = { ...originalStudent, ...req.body };
//     teachers.splice(originalStudentIndex, 1, newStudent);
//     res.status(200).json({
//       message: "teacher has been updated successfully",
//       data: teachers[originalStudentIndex]
//     });
//   } else res.status(400).send("Teacher id is invalid");
// });

TeachersRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const result = await Teacher.update(req.body, {
      where: {
        id
      }
    });
    if (result.length) {
      res.status(200).json({ message: "Student Updated!" });
    } else {
      res.status(400).send("Student unavailable");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

/* routes methods for manipulating students of a Teachers*/

TeachersRouter.get("/:id/students/:stuId", (req, res) => {
  const { id, stuId } = req.params;
  console.log(id);

  const studentId = parseInt(id);
  let originalStudentIndex;
  for (var i = 0; i < teachers.length; i++) {
    if (teachers[i].id === studentId) originalStudentIndex = i;
  }
  if (originalStudentIndex != undefined) {
    //var result = teachers[originalStudentIndex].students[stuId - 1];
    for (var i = 0; i < teachers[originalStudentIndex].students.length; i++) {
      if (teachers[originalStudentIndex].students[i].id == stuId) {
        res.status(200).json({
          message: "student has been retrived successfully!!",
          data: teachers[originalStudentIndex].students[i]
        });
      }
    }
    res.status(400).send("Student id is invalid");
  }
  res.status(400).send("Teacher id is invalid");
});

TeachersRouter.delete("/:id/students/:stuId", (req, res) => {
  const { id, stuId } = req.params;
  console.log(id);

  const studentId = parseInt(id);
  let originalStudentIndex;
  for (var i = 0; i < teachers.length; i++) {
    if (teachers[i].id === studentId) originalStudentIndex = i;
  }
  if (originalStudentIndex != undefined) {
    for (var i = 0; i < teachers[originalStudentIndex].students.length; i++) {
      if (teachers[originalStudentIndex].students[i].id == stuId) {
        teachers[originalStudentIndex].students.splice(i, 1);
        res.status(200).send("student has been deletd successfully!!");
      }
    }
    res.status(400).send("Student id is invalid");
  } else res.status(400).send("Teacher id is invalid");
});

TeachersRouter.post("/:id/students", async (req, res) => {
  try {
    const result = await Student.create(req.body);
    console.log(result.get());
    // const { id } = result.get();
    // studentSeeder(id);
  } catch (e) {
    console.error(e);
  }

  // var obj = req.body;
  // var ID = req.params.id;
  // var { firstName, lastName, age, gender } = obj;
  // var { math, english, science, tamil } = obj;
  // if (teachers[ID].students.length > 0) {
  //   var id = teachers[ID].students[teachers[ID].students.length - 1].id + 1;
  //   var bool = false;
  //   var studentsIndex;
  //   var teachersIndex;
  //   for (var i = 0; i < teachers.length; i++) {
  //     for (var j = 0; j < teachers[i].students.length; j++) {
  //       if (teachers[i].students[j].id === id) {
  //         bool = true;
  //         teachersIndex = i;
  //         studentsIndex = j;
  //       }
  //     }
  //   }
  //   console.log(bool);
  //   //  console.log(studentsIndex);
  //   console.log(teachersIndex);
  //   if (bool != true) {
  //     var obj1 = {
  //       id,
  //       firstName,
  //       lastName,
  //       age,
  //       gender,
  //       scores: { math, english, science, tamil }
  //     };

  //     teachers[ID].students.push(obj1);
  //   } else {
  //     console.log("hi");
  //     for (var i = teachersIndex; i < teachers.length; i++) {
  //       for (var j = 0; j < teachers[i].students.length; j++) {
  //         teachers[i].students[j].id = teachers[i].students[j].id + 1;
  //       }
  //     }
  //     var obj1 = {
  //       id,
  //       firstName,
  //       lastName,
  //       age,
  //       gender,
  //       scores: { math, english, science, tamil }
  //     };

  //     teachers[ID].students.push(obj1);
  //   }
  //   res.status(200).json({ message: "student details added successfully!!" });
  // } else {
  //   id =
  //     teachers[teachers.length - 2].students[
  //       teachers[teachers.length - 2].students.length - 1
  //     ].id + 1;
  //   console.log(id);
  //   console.log("hiiiiiiii");
  //   var obj1 = {
  //     id,
  //     firstName,
  //     lastName,
  //     age,
  //     gender,
  //     scores: { math, english, science, tamil }
  //   };

  //   teachers[ID].students.push(obj1);
  res.status(200).json({ message: "student details added successfully!!" });
});
// const { id } = req.params;

// const studentId = parseInt(id);
// let originalStudentIndex;
// for (var i = 0; i < teachers.length; i++) {
//   if (teachers[i].id === studentId) originalStudentIndex = i;
// }

// if (originalStudentIndex != undefined) {
//   teachers[originalStudentIndex].students.push(req.body);
//   res.status(200).json({
//     message: "student has been added successfully!!",
//     data: req.body
//   });
// } else res.status(400).send("Teacher id is invalid");

TeachersRouter.put("/:id/students/:stuId", async (req, res) => {
  try {
    const { id, stuId } = req.params;

    console.log("............");

    console.log(req.body);

    console.log("...............");

    console.log(id);

    const result = await Student.update(req.body, {
      where: {
        id: stuId
      }
    });
    if (result.length) {
      res.status(200).json({ message: "Student Updated!" });
    } else {
      res.status(400).send("Student unavailable");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }

  //   var { id, stuId } = req.params;
  //   id = parseInt(id);
  //   console.log(req.body);
  //   id = parseInt(id);
  //   stuId = parseInt(stuId);
  //   var { firstName, lastName, age, gender } = req.body;
  //   var { math, english, science, tamil } = req.body;
  //   console.log(math);
  //   console.log(english);
  //   console.log(science);
  //   console.log(tamil);
  //   var scores = { math, english, science, tamil };

  //   console.log(scores);
  //   var stuIndex;
  //   for (var i = 0; i < teachers[id].students.length; i++) {
  //     if (teachers[id].students[i].id === stuId) stuIndex = i;
  //   }

  //   if (math != teachers[id].students[stuIndex].scores.math) {
  //     teachers[id].students[stuIndex].scores.math = math;
  //   }

  //   if (english != teachers[id].students[stuIndex].scores.english) {
  //     teachers[id].students[stuIndex].scores.english = english;
  //   }
  //   if (science != teachers[id].students[stuIndex].scores.science) {
  //     teachers[id].students[stuIndex].scores.science = science;
  //   }
  //   if (tamil != teachers[id].students[stuIndex].scores.tamil) {
  //     teachers[id].students[stuIndex].scores.tamil = tamil;
  //   }

  //   var oldStudent = teachers[id].students[stuIndex];
  //   var newStudent = {
  //     ...oldStudent,
  //     firstName,
  //     lastName,
  //     age,
  //     gender
  //   };
  //   console.log(newStudent);
  //   teachers[id].students.splice(stuIndex, 1, newStudent);
  //   res
  //     .status(200)
  //     .json({ message: "student details has been updated successfully!!.." });
  //   //if(teachers[i])

  //   // const studentId = parseInt(id);
  //   // let originalStudentIndex;
  //   // for (var i = 0; i < teachers.length; i++) {
  //   //   if (teachers[i].id === studentId) originalStudentIndex = i;
  //   // }

  //   // if (originalStudentIndex != undefined) {
  //   //   for (var i = 0; i < teachers[originalStudentIndex].students.length; i++) {
  //   //     if (teachers[originalStudentIndex].students[i].id == stuId) {
  //   //       let originalStudent = teachers[originalStudentIndex].students[i];
  //   //       let newStudent = { ...originalStudent, ...req.body };

  //   //       teachers[originalStudentIndex].students.splice(i, 1, newStudent);

  //   //       res.status(200).json({
  //   //         message: "student has been updated successfully!!",
  //   //         data: newStudent
  //   //       });
  //   //     }
  //   //   }
  //   //   res.status(400).send("Student id is invalid");
  //   // } else res.status(400).send("Teacher id is invalid");
});
module.exports = TeachersRouter;

module.exports = {
  // studentsRouter,
  getAllteachers,
  TeachersRouter,
  getTeacherById,
  getStudentById,
  getAllStudents,
  getStudentByTeacherId
};
