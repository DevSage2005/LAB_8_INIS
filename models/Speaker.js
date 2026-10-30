const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
  },
}, { timestamps: true }); // timestamps автоматически добавит createdAt и updatedAt

module.exports = mongoose.model('Speaker', speakerSchema);