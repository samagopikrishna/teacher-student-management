const { Sequelize, DataTypes } = require("sequelize");
const teacherDb = require("../db.js");
const Teacher = require("./Teachers.js");

const teacher = teacherDb.define("teacher", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    field: "first_name",
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    field: "last_name",
    type: DataTypes.STRING,
    allowNull: true
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 3,
      max: 50
    }
  },
  class: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 12
    }
  }
  // gender: {
  //   type: DataTypes.ENUM,
  //   values: ["Male", "Female"],
  //   allowNull: false
  // }
});

module.exports = teacher;
