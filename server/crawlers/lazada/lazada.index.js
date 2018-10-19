const puppeteer = require("puppeteer");
const connectMongo = require("../../shared/connect-mongo");
const Item = require("../../models/item.model");
const { script } = require('./lazada.script');
const targetLink = 'https://www.lazada.vn/laptop/?spm=a2o4n.home.cate_1.3.41b86afetVzRsA';
(async() => {
  try {
    await connectMongo.connecMongo();
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
    console.log(data);
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
})();