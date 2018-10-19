const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
  title: String, 
  hostname: String,
  URL: String,
  discount: Number, 
  image: String, 
  currentPrice: Number, 
  originalPrice: Number,
  inWishListOf: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});
/*ItemSchema.pre('save', function (next) {
  let err;
  if(!this.isNew){
    err = new Error('This item is already in the database.');
  }
  next(err);
});*/

/*ItemSchema.post('save', function () {
    if (this.wasNew) {
        // ...
        
    }
});*/
module.exports = mongoose.model("Item", ItemSchema);