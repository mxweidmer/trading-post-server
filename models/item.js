const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itemSchema = Schema({
  _owner: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: {
    type: String,
    trim: true,
    default: ""
  },
  picture: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    trim: true,
    default: ""
  },
  condition: {
    type: String,
    trim: true,
    default: ""
  },
 /*  createdAt: {
    type: Date,
    default: Date.now
  }, */
  category: {type: String, enum: ['General','Books', 'Electronics', 'Jewelry', 'Tools', 'Clothing','Furniture', 'Games','Sports Equipment', 'Appliances'] }

},
{ timestamps: true}
);

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;