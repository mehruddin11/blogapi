
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  likes:{type:Number, required: false},
  image:{type:String, require:false},
});

module.exports = mongoose.model('BlogPost', blogPostSchema);