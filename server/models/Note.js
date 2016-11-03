const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  lastUpdated: { type: Date, required: true, default: Date.now },
  text: { type: String },
  screenshot: { type: String },
  refPoint: { type: String, required: true }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
