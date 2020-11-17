const path = require("path");
const express = require("express");
require("dotenv").config({
  path: path.join(__dirname,"./.env")
})

const teacherss = require("./modals/Teachers.js");
const bodyParser = require("body-parser");
const Student = require("./modals/studentModal.js");
const {
  // studentsRouter,
  getAllteachers,
  TeachersRouter,
  getTeacherById,
  getStudentById,
  getAllStudents,
  getStudentByTeacherId
  // getStudentById
} = require("./routes/TeachersRouter.js");

const ifEquality = require("./views/helpers/ifEquality");

const expressHbs = require("express-handlebars");
require('dotenv').config()


//const TeachersRouter = require("./routes/TeachersRouter");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers: {
    ifEquality
  }
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
  res.status(200).render("home.hbs", {
    layout: "hero.hbs",
    title: "homePage"
  });
});

// app.get("/teachers", async (req, res) => {
//   res.status(200).render("teachers.hbs", {
//     layout: "navigation.hbs",
//     title: "teacherDetailspage",
//     data: await getAllteachers()
//   });
// });

app.get("/teachers", async (req, res) => {
  try {
    res.status(200).render("teachers.hbs", {
      layout: "navigation.hbs",
      title: "teacherDetailspage",
      data: await getAllteachers()
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server error");
  }
});

app.get("/about", (req, res) => {
  res.status(200).render("home.hbs", {
    message: "you are in about page"
  });
});

app.get("/add-teachers", (req, res) => {
  res.status(200).render("teacherForm.hbs", {
    layout: "navigation.hbs",
    title: "AddteacherPage",
    action: "/teachers",
    method: "POST"
  });
});

app.get("/studentss", (req, res) => {
  res.status(200).render("students.hbs", {
    layout: "navigation.hbs",
    //data: requiredStudent, //students,
    //teacherId: id,
    title: "studentDetailsPage"
  });
});

app.get("/teacher-students/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  console.log("..................");
  console.log(id);
  console.log("..................");

  console.log("..................");
  //console.log(requiredStudent);
  console.log("..................");
  var requiredStudent = await getStudentByTeacherId(id);

  // console.log(id);
  // var students = [];
  // var teachersIndex;
  // for (var i = 0; i < teacherss.length; i++) {
  //   if (teacherss[i].id == id) teachersIndex = i;
  // }
  // if (teacherss[teachersIndex].students.length != "undefined") {
  //   for (var j = 0; j < teacherss[teachersIndex].students.length; j++) {
  //     console.log(teacherss[teachersIndex].students[j]);
  //     students.push(teacherss[teachersIndex].students[j]);
  //   }
  // }
  //students.push({ teacherIndex: teachersIndex });

  console.log(requiredStudent);

  res.status(200).render("students.hbs", {
    layout: "navigation.hbs",
    data: requiredStudent, //students,
    teacherId: id,
    title: "studentDetailsPage"
  });
});

app.get("/edit-teacher/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  const requiredTeacher = await getTeacherById(parseInt(id));
  // console.log(typeof id);
  // console.log(id);
  // console.log(teacherss.length);
  // var teachersId;
  // for (var i = 0; i < teacherss.length; i++) {
  //   if (teacherss[i].id == id) teachersId = i;
  // }
  // console.log(teacherss[teachersId]);
  res.status(200).render("teacherForm.hbs", {
    layout: "navigation.hbs",
    title: "EditteacherPage",
    teacher: requiredTeacher, //teacherss[teachersId],
    action: "/teachers/" + id, //teachersId,
    method: "PUT",
    id: id //teachersId
  });
});

app.get("/students", async (req, res) => {
  // var studentsArr = [];
  // for (var i = 0; i < teacherss.length; i++) {
  //   if (teacherss[i].students.length != "undefined") {
  //     for (var j = 0; j < teacherss[i].students.length; j++) {
  //       studentsArr.push(teacherss[i].students[j]);
  //     }
  //   }

  res.status(200).render("students1.hbs", {
    layout: "navigation.hbs",
    title: "StudentsPage",
    data: await getAllStudents()
  });
});

app.get("/add-students/:teacherId", async (req, res) => {
  var teacherId = req.params.teacherId;
  teacherId = parseInt(teacherId);
  res.status(200).render("studentForm.hbs", {
    layout: "navigation.hbs",
    title: "StudentFormPage",
    method: "POST",
    teacherId: teacherId,
    data: await getAllteachers(),
    action: "/teachers/" + teacherId + "/students"
  });
});

app.get("/edit-students/:id/:studentId", async (req, res) => {
  let { id, gender, studentId } = req.params;
  id = parseInt(id);
  studentId = parseInt(studentId);
  const requiredStudent = await getStudentById(parseInt(studentId));

  console.log("//////////////////////////");
  console.log(requiredStudent);
  console.log("...............");
  // console.log(gender);
  // console.log(id);
  // console.log(studentId);
  // var studentIndex = 0;
  // var teacherIndex = 0;
  // for (var i = 0; i < teacherss.length; i++) {
  //   for (var j = 0; j < teacherss[i].students.length; j++) {
  //     if (teacherss[i].students[j].id == studentId) {
  //       studentIndex = j;
  //       teacherIndex = i;
  //     }
  //   }
  // }

  //console.log(teacherss[teacherIndex].students[studentIndex]);
  res.status(200).render("studentForm.hbs", {
    layout: "navigation.hbs",
    title: "StudentFormPage",
    student: requiredStudent[0], //teacherss[teacherIndex].students[studentIndex],
    method: "PUT",
    teacherId: id,
    data: await getAllteachers(),
    action: "/teachers/" + id + "/students/" + studentId
  });
});

app.put("/delete/:id", async (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  console.log("akhillllllllllllllll");
  console.log(req.body);
  console.log("akhillllllllllllllllll");

  await Student.destroy({
    where: {
      firstName: req.body.firstName,
      teacherId: id
    }
  });

  try {
    const result = await Student.create(req.body);
    console.log(result.get());
    // const { id } = result.get();
    // studentSeeder(id);
  } catch (e) {
    console.error(e);
  }
  //   const result = await Student.findAll();
  //   console.log(
  //     "students table has been deleted successfully!!!!!" + JSON.stringify(result)
  //   );

  res.status(200).json({
    message: "student deleted and added successfully !!!",
    data: req.body
  });
});

app.use("/teachers", TeachersRouter);

app.listen(4000, () => {
  console.log("server running");
});
