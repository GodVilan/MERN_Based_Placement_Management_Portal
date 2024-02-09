import mongoose from "mongoose";
const submissionSchema = new mongoose.Schema({
  problemName: String,
  code: String,
  status: String,
});

const userSchema = new mongoose.Schema({
  uid: String,
  submissions: [submissionSchema],
});

const User = mongoose.model('User', userSchema);
const Submission = mongoose.model('Submission', submissionSchema);

export default { User, Submission };