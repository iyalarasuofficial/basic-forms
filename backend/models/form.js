import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  bio: { type: String, required: true, minlength: 150, maxlength: 200 },
  portfolioLink: { type: String, trim: true },
  resume: { type: String, required: true },
  profilePic: { type: String, required: true },
  socialLinks: {
    linkedin: { type: String },
    leetcode: { type: String },
    behance: { type: String },
    dribbble: { type: String },
    hackerrank: { type: String },
    insta: { type: String },
    x: { type: String },
    reddit: { type: String },
    hackerearth: { type: String },
    codechef: { type: String }
  }
}, { timestamps: true });

export default mongoose.model("Form", formSchema);
