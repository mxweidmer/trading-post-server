const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itemSchema = Schema({
  _owner: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  picture: String,
  description: String,
  condition: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;