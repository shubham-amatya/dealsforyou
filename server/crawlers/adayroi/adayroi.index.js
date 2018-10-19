const puppeteer = require("puppeteer");
//const connectMongo = require("../../shared/connect-mongo");
const Item = require("../../models/item.model");
const { script } = require('./adayroi.script');
module.exports.adayroi = async function () {
  try {
    //await connectMongo.connecMongo();
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process'
      ],
    });
    const page = await browser.newPage();
    //await page.goto(targetLink);
    //console.log(`Page loaded!`);
    // enable console.log command in the script
    await page.on('console', msg => {
      for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });
    // execute the script
    //const data = await page.evaluate(script);
    // save the retrieved data into the database
    for (let pageNum = 0; pageNum <= 15; pageNum++) {//15
      //console.log(pageNum);
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