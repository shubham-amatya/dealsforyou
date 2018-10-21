const puppeteer = require("puppeteer");
//const connectMongo = require("../../shared/connect-mongo");
const Item = require("../../models/item.model");
const { script } = require('./adayroi.script');
module.exports.adayroi = async function () {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.on('console', msg => {
      for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });
    for (let pageNum = 0; pageNum <= 15; pageNum++) {//15
      const targetLink = `https://www.adayroi.com/laptop-may-tinh-xach-tay-c350?q=%3Anew&page=${pageNum}`;
      await page.goto(targetLink);
      const data = await page.evaluate(script); 
      for (const item of data) {
        const count = await Item.count({ 'URL': item.URL });
        if(count) {
          continue; 
        }
        let newItem = new Item(item);
        await newItem.save();
      }
    }  
    await browser.close();
    console.log('Done!');
  }
  catch (err) {
    console.log(err);
  }
};


