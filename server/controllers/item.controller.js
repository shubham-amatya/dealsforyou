const Item = require("../models/item.model");

exports.getItems = async(req, res) => {
  try {
    const pageSize = +req.query.pagesize;
    const page = +req.query.page;
    
    const find = {};
    const sort = {};
    
    req.query.sortbyprice ? sort.currentPrice = Number(req.query.sortbyprice): false;
    req.query.sortbydiscount ? sort.discount = Number(req.query.sortbydiscount): false;
    req.query.findbytitle ? find.title =  { "$regex": `${req.query.findbytitle}`, "$options": "i" }: false;
    req.query.findbywebsite ? find.hostname = req.query.findbywebsite: false;
    req.query.findbycategory ? find.category = req.query.findbycategory: false;
    
    let items = Item.find(find);
    let foundItems = await items;
    
    if (pageSize && page) {
      items = await items.sort(sort).skip(pageSize * (page - 1)).limit(pageSize);
    }
    res.status(200).json({
      message: "Promotions fetched successfully!",
      messageType: "alert-success",
      items: items,
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
    
    const find = {};
    const sort = {};

    req.query.sortbyprice ? sort.currentPrice = Number(req.query.sortbyprice): false;
    req.query.sortbydiscount ? sort.discount = Number(req.query.sortbydiscount): false;
    req.query.findbytitle ? find.title =  { "$regex": `${req.query.findbytitle}`, "$options": "i" }: false;
    req.query.findbywebsite ? find.hostname = req.query.findbywebsite: false;
    req.query.findbycategory ? find.category = req.query.findbycategory: false;
    
    let wishlist = Item.find({ inWishListOf: req.params.userId, ...find });
    let collectionSize = (await wishlist).length;
    if (pageSize && page) {
      wishlist = 
      await wishlist
      .sort(sort)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
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

