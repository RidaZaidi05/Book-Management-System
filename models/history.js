// models/SearchHistory.js
import mongoose from 'mongoose';

const searchHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  searchQuery: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const History = mongoose.models.History || mongoose.model('History', searchHistorySchema);

export default History;
