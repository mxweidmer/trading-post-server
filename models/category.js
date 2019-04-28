const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categorySchema = Schema({
    name: String,
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
})

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;