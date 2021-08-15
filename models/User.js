const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UserSchema = new Schema({
   name:{
      type: String,
      required: true
   },
   email: {
      type: String,
      unique: true,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   loginAttempts:{
      type: Number,
      required: true,
      default: 0
   },
   lockUntil:{
      type: Number
   }
},{
   timestamps: true,
   collection: 'users'
})
module.exports = User = mongoose.model("users", UserSchema);