const { db } = require("../config/database");
const mongodb = require("mongodb");

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  save() {
    db().collection("users").insertOne(this);
  }

  static findByName(username, cb) {
    db()
      .collection("users")
      .findOne({ username: username })
      .then((user) => {
        cb(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(id, cb) {
    db()
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(id) })
      .then((user) => {
        cb(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
exports.User = User;
