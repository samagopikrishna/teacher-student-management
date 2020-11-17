const { Sequelize, DataTypes } = require("sequelize");
const teacherDb = require("../db.js");
const Teacher = require("./teacherModel.js");

const students = teacherDb.define("student", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "first_name"
  },
  lastName: {
    type: DataTypes.STRING,
    field: "last_name"
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 3,
      max: 16
    }
  },
  gender: {
    type: DataTypes.ENUM,
    values: ["Male", "Female"],
    allowNull: false
  },

  math: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  english: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  science: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tamil: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  teacherId: {
    type: DataTypes.INTEGER,
    field: "teacher_id",
    allowNull: false,
    references: {
      model: Teacher,
      key: "id"
    }
  }
});

module.exports = students;
