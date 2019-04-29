const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itemSchema = Schema({
  _owner: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: {
    type: String,
    trim: true,
    default: undefined
  },
  picture: {
    type: String,
    default: undefined
  },
  description: {
    type: String,
    trim: true,
    default: undefined
  },
  condition: {
    type: String,
    trim: true,
    default: undefined
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;