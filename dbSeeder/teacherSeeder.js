var Teacher = require("../modals/teacherModel.js");
const teachers = require("../modals/Teachers.js");
const { studentSeeder } = require("./studentSeeder.js");

const teacherSeeder = async () => {
  await Teacher.sync({ force: true });

  teachers.forEach(async item => {
    //var count = 0;
    console.log(item);
    try {
      const result = await Teacher.create(item);
      console.log(result.get());
      const { id } = result.get();
      studentSeeder(id);
    } catch (e) {
      console.error(e);
    }
    //count = count + 1;
  });
};

teacherSeeder();
