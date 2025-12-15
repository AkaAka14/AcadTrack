const mongoose = require('mongoose');

const AttendanceRecord = new mongoose.Schema({
  subject: String,
  date: Date,
  present: Boolean,
});

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  faceId: { type: String },
  attendance: [AttendanceRecord],
});

module.exports = mongoose.model('Student', StudentSchema);
