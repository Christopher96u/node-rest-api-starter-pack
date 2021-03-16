const { Schema, model } = require("mongoose");

/* const user = {
     name : '',
     email: '',
     password: '',
     image: '',
     role: '',
     status: false,
     google: false,
 } */

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "The name is required"], // required : true | if you dont want that your DB validate that field
  },
  email: {
    type: String,
    required: [true, "The email is required"], // Array is optional or just send a boolean
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password is required"],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE", "SALES_ROLE"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});
/* Delete __v and password from User to send the user object to Frontend */
/* For building this method we have to use 'function' NO arrow functions */
UserSchema.methods.toJSON = function () {
  // Using spread operator to return all user object properties without __v and password
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
