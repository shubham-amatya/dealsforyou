const Item = require("../models/item.model");
const User = require("../models/user.model");

exports.SortByCurrentPriceDescending = async(req, res) => {
  try {
    const result = await Item.find().sort({ "currentPrice": -1 });
    //console.log(result);
    res.status(200).json(result);
  }
  catch (err) { console.log(err); }
};

exports.SortByDiscountPercentageDescending = async(req, res) => {
  try {
    const result = await Item.find().sort({ "percentage": -1 });
    console.log(result);
    //res.status(200).json(result);
  }
  catch (err) { console.log(err); }
};

exports.SearchByHost = async(req, res) => {
  try {
    const result = await Item.find({ hostname: 'tiki.vn' }).sort({ "currentPrice": -1 });
    //console.log(result);
    res.status(200).json(result);
  }
  catch (err) { console.log(err); }
};

/*exports.getItems = async(req, res) => {
  try {
    const pageSize = +req.query.pagesize;
    const page = +req.query.page;
    const collectionSize = await Item.count();
    let items = Item.find();
    if (pageSize && page) {
      items = await items.skip(pageSize * (page - 1)).limit(pageSize);
    }
    res.status(200).json({
      message: "Promotions fetched successfully!",
      messageType: "alert-success",
      items: items,
      collectionSize: collectionSize
    });
  }
  catch (err) { 
    res.status(500).json({
      message: err.message,
      messageType: "alert-danger"
    }).end();  
  }
};*/

/*exports.getWishListItems = async(req, res) => {
  try {
    const pageSize = +req.query.pagesize;
    const page = +req.query.page;
    const user = await User.findById(req.params.userId)
    .skip(pageSize * (page - 1)).limit(pageSize)
    .populate("wishlist").exec();
    res.status(200).json({
      message: "Wishlist fetched successfully!",
      messageType: "alert-success",
      user: user,
      wishlist: user.wishlist,
      collectionSize: user.wishlist.length
    });
  }
  catch (err) { 
    res.status(500).json({
      message: err.message,
      messageType: "alert-danger"
    }).end();  
  }
};

exports.addToWishList = async(req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const isInWishList = user.wishlist.some(elm => {
      return elm.equals(req.params.itemId);
    });
    if (isInWishList) {
      return res.status(500).json({
        message: 'This item is already in your wishlist.',
        messageType: 'alert-danger'
      });
    } 
    user.wishlist.push(req.params.itemId);  
    user.save();
    return res.status(200).json({
      message: "Item added to your wishlist.",
      messageType: "alert-success",
      user: user
    }).end();
  }
  catch (err) { 
    return res.status(500).json({
      message: err.message,
      messageType: "alert-danger"
    }).end();  
  }
};

exports.removeFromWishList = async(req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const index = user.wishlist.findIndex(elm => req.params.userId);
    user.wishlist.splice(index, 1);
    user.save();
    return res.status(200).json({
      successMessage: "Item removed from your wishlist.",
      messageType: "alert-success"
    }).end();
  }
  catch (err) { 
    return res.status(500).json({
      message: err.message,
      messageType: "alert-danger"
    }).end();  
  }
};*/

exports.getItems = async(req, res) => {
  try {
    const pageSize = +req.query.pagesize;
    const page = +req.query.page;
    //const sortByPrice = Number(req.query.sortbyprice);
    const find = {};
    const sort = {};
    req.query.sortbyprice ? sort.currentPrice = Number(req.query.sortbyprice): false;
    req.query.sortbydiscount ? sort.discount = Number(req.query.sortbydiscount): false;
    req.query.findbytitle ? find.title =  { "$regex": `${req.query.findbytitle}`, "$options": "i" }: false;
    req.query.findbywebsite ? find.hostname = req.query.findbywebsite: false;
    req.query.findbycategory ? find.category = req.query.findbycategory: false;
    //console.log(find);
    //console.log(req.query.findbywebsite);
    //const collectionSize = await Item.count();
    //console.log(sort);
    //console.log(req.query.findbywebsite);
    //const collectionSize = await Item.count();
    let items = Item.find(find);
    let foundItems = await items;
    //console.log(foundItems);
    if (pageSize && page) {
      //items = await items.skip(pageSize * (page - 1)).limit(pageSize).sort(sort);
      items = await items.sort(sort).skip(pageSize * (page - 1)).limit(pageSize);
    }
    res.status(200).json({
      message: "Promotions fetched successfully!",
      messageType: "alert-success",
      items: items,
      //collectionSize: collectionSize
      collectionSize: foundItems.length
    });
  }
  catch (err) { 
    res.status(500).json({
      message: err.message,
      messageType: "alert-danger"
    }).end();  
  }
};

exports.getWishListItems = async(req, res) => {
  try {
    const pageSize = +req.query.pagesize;
    const page = +req.query.page;
    //const sortByPrice = Number(req.query.sortbyprice);
    const find = {};
    const sort = {};
    //console.log(sort);
    req.query.sortbyprice ? sort.currentPrice = Number(req.query.sortbyprice): false;
    req.query.sortbydiscount ? sort.discount = Number(req.query.sortbydiscount): false;
    req.query.findbytitle ? find.title =  { "$regex": `${req.query.findbytitle}`, "$options": "i" }: false;
    req.query.findbywebsite ? find.hostname = req.query.findbywebsite: false;
    req.query.findbycategory ? find.category = req.query.findbycategory: false;
    //console.log(find);
    //console.log({ inWishListOf: req.params.userId, ...find });
    //console.log(req.query.findbywebsite);
    
    //console.log(sort);
    //console.log({ inWishListOf: req.params.userId, ...find });
    //console.log(req.query.sortbydiscount);
    
    let wishlist = Item.find({ inWishListOf: req.params.userId, ...find });
    let collectionSize = (await wishlist).length;
    if (pageSize && page) {
      //wishlist = await wishlist.skip(pageSize * (page - 1)).limit(pageSize).sort(sort);
      wishlist = await wishlist.sort(sort).skip(pageSize * (page - 1)).limit(pageSize);
    }
    res.status(200).json({
      message: "Wishlist fetched successfully!",
      messageType: "alert-success",
      wishlist: wishlist,
      collectionSize: collectionSize
    });
  }
  catch (err) { 
    res.status(500).json({
      message: err.message,
      messageType: "alert-danger"
    });  
  }
};

exports.addToWishList = async(req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    const isInWishList = item.inWishListOf.some(elm => {
      return elm.equals(req.params.userId);
    });
    if (isInWishList) {
      return res.status(500).json({
        message: 'This item is already in your wishlist.',
        messageType: 'alert-danger'
      });
    } 
    item.inWishListOf.push(req.params.userId);  
    item.save();
    return res.status(200).json({
      message: "Item added to your wishlist.",
      messageType: "alert-success",
      item: item
    });
  }
  catch (err) { 
    return res.status(500).json({
      message: err.message,
      messageType: "alert-danger"
    });  
  }
};

exports.removeFromWishList = async(req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    const index = item.inWishListOf.findIndex(elm => req.params.userId);
    item.inWishListOf.splice(index, 1);
    item.save();
    return res.status(200).json({
      successMessage: "Item removed from your wishlist.",
      messageType: "alert-success"
    });
  }
  catch (err) { 
    return res.status(500).json({
      message: err.message,
      messageType: "alert-danger"
    });  
  }
};

