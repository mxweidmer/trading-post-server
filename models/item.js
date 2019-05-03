const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itemSchema = Schema({
  _owner: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
  title: {
    type: String,
    trim: true,
    default: "",
    required: true
  },
  picture: {
    type: String,
    default: "",
    required: true
  },
  description: {
    type: String,
    trim: true,
    default: ""
  },
  condition: {
    type: String,
    trim: true,
    default: "",
    required: true
  },
  category: {
    type: String,
    enum: ['General', 'Books', 'Electronics', 'Jewelry', 'Tools', 'Clothing', 'Furniture', 'Games', 'Sports Equipment', 'Appliances'],
    default: 'General'
  }
}, { timestamps: true });

itemSchema.index({title: 'text', category: 'text'});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;