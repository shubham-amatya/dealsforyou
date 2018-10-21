exports.script = async () => {
  const config = {
    protocol: 'https://',
    hostname: 'shopee.vn',
    item: '.shopee-search-item-result__item',
    link: '.shopee-item-card--link',
    coverImage: '.shopee-item-card__cover-img',
    coverImgageBackground: '.shopee-item-card__cover-img-background',
    originalPrice: '.shopee-item-card__original-price',
    currentPrice: '.shopee-item-card__current-price',
    percentage: '.percent'
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
      data.push({
        title: item.querySelector(config.link).getAttribute('title'),
        hostname: config.hostname,
        URL: item.querySelector(config.link).getAttribute('href'),
        percentage: Number(item.querySelector(config.percentage).textContent.replace(/[^\w]/g, '')),
        //image: item.querySelector(config.coverImgageBackground).getAttribute('style').match(/(https?:\/\/[^\s);"]+)/g),
        image: item.querySelector(config.coverImgageBackground).getAttribute('style'),
        originalPrice: Number(item.querySelector(config.originalPrice).textContent.replace(/[^\w]/g, '')),
        currentPrice: Number(item.querySelector(config.currentPrice).textContent.replace(/[^\w]/g, '')),
      });
    });
    console.log(data);
    return Array.from(new Set(data));
  }
  catch (err) { console.log(err.message); }
};

