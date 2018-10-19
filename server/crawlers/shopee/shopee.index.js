const puppeteer = require("puppeteer");
//const connectMongo = require("../../shared/connect-mongo");
const Item = require("../../models/item.model");
const { script } = require('./shopee.script');
const targetLink = 'https://shopee.vn/search?facet=13065&keyword=laptop&page=0&sortBy=ctime&withDiscount=true';
module.exports.shopee = async function () {
  try {
    //await connectMongo.connecMongo();
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto(targetLink);
    console.log(`Page loaded!`);
    // enable console.log command in the script
    await page.on('console', msg => {
      for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });
    // execute the script
    const data = await page.evaluate(script);
    // save the retrieved data into the database
    for (const item of data) {
      let newItem = new Item(item);
      await newItem.save();
      //console.log(newItem);
    }
    await browser.close();
    console.log('Done!');
  }
  catch (err) {
    console.log(err);
  }
};