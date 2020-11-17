const Student = require("../modals/studentModal.js");

const studentData = [
  {
    firstName: "Arun",
    lastName: "Kumar",
    age: 16,
    gender: "Male",
    math: 90,
    english: 80,
    science: 70,
    tamil: 60
  },
  {
    firstName: "Ram",
    lastName: "Kumar",
    age: 16,
    gender: "Male",
    math: 90,
    english: 80,
    science: 70,
    tamil: 60
  },
  {
    firstName: "Ravi",
    lastName: "Kumar",
    age: 16,
    gender: "Male",
    math: 90,
    english: 80,
    science: 70,
    tamil: 60
  },
  {
    firstName: "Magesh",
    lastName: "Kumar",
    age: 16,
    gender: "Male",
    math: 90,
    english: 80,
    science: 70,
    tamil: 60
  },
  {
    firstName: "Suresh",
    lastName: "Kumar",
    age: 16,
    gender: "Male",
    math: 90,
    english: 80,
    science: 70,
    tamil: 60
  }
];

// exports.studentSeeder = async teacherId => {
//   // `force: true` will clear existing tables
//   await Student.sync({ force: true });

//   studentData.every(async student => {
//     try {
//       const result = await Student.create({
//         ...studentData[teacherId - 1],
//         teacherId
//       });
//       console.log(result.get());
//     } catch (e) {
//       console.error(e);
//     }
//   });
//   return false;
//   // var count = 0;

exports.studentSeeder = async teacherId => {
  try {
    //await Student.sync({ force: true });
    console.log("-------------------------");
    console.log(studentData[teacherId - 1]);
    console.log("----------------------------");
    for (var i = teacherId; i <= teacherId; i++) {
      const result = await Student.create({
        ...studentData[teacherId - 1],
        teacherId
      });

      // count = count + 1;
      console.log(result.get());
    }
  } catch (e) {
    console.error(e);
  }
};
