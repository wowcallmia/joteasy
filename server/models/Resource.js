const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  lastUpdated: { type: Date, required: true, default: Date.now },
  source: { type: String, required: true },
  type: { type: String, required: true, enum: ['Image', 'Video', 'Website', 'Book'] },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});

const Resource = mongoose.model('Resource', ResourceSchema);

module.exports = Resource;
