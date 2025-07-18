import mongoose from 'mongoose';

// 몽도DB 스키마
const achivement = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  target: {
    type: Number,
    required: true,
  },
  isTrue: {
    type: Boolean,
    required: true,
  },
  progress:{
    type: Number
  }
});

export default mongoose.model('AchivementList', achivement);
