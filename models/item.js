const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itemSchema = Schema({
  _owner: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: {
    type: String,
    trim: true
  },
  picture: String,
  description: {
    type: String,
    trim: true
  },
  condition: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;