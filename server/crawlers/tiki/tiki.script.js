exports.script = async() => {
  const config = {
    protocol: 'https://',
    hostname: 'tiki.vn',
    item: '.product-item',
    link: 'a',
    coverImgageBackground: '.product-image',
    originalPrice: '.price-regular',
    currentPrice: '.final-price',
    discount: '.sale-tag'
  };
  try {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 100;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if(totalHeight >= scrollHeight){
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
    const data = [];
    const items = document.querySelectorAll(config.item);
    items.forEach(async item => {
      //let discount = Number(item.querySelector(config.percentage).textContent.replace(/[^\w]/g, ''));
      //if(discount) {
        data.push({
          title: item.querySelector(config.link).getAttribute('title'),
          hostname: config.hostname,
          URL: item.querySelector(config.link).getAttribute('href').replace(/https?:\/\/tiki.vn?/g, ''),
          discount: Number(item.querySelector(config.discount).textContent.replace(/[^\w]/g, '')),
          //discount: discount,
          image: item.querySelector(config.coverImgageBackground).getAttribute('src'),
          originalPrice: Number(item.querySelector(config.originalPrice).textContent.replace(/[^\w]/g, '')),
          currentPrice: Number(item.querySelector(config.currentPrice).textContent.replace(/[^\w]/g, '')),
        });
      //}
    });
    //console.log(data);
    return Array.from(new Set(data));
  }
  catch (err) { console.log(err.message); }
};