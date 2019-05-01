const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var wishlistSchema = Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'Person' },
  _item: { type: Schema.Types.ObjectId, ref: 'Item' }  //better to add one record per each item or have an array?
})

var Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;