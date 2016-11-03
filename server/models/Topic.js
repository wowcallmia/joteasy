const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  lastUpdated: { type: Date, required: true, default: Date.now },
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }]
});

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;
