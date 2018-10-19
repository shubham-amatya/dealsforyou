exports.script = async() => {
  const config = {
    protocol: 'https://',
    hostname: 'www.adayroi.com',
    item: '.product-item__wrapper',
    link: '.product-item__thumbnail ',
    coverImgageBackground: '.swiper-lazy',
    originalPrice: '.product-item__info-price-original',
    currentPrice: '.product-item__info-price-sale',
    discount: '.product-item__info-discount'
  };
  try {
    const data = [];
    const items = document.querySelectorAll(config.item);
    items.forEach(async item => {
      data.push({
        title: item.querySelector(config.coverImgageBackground).getAttribute('title'),
        hostname: config.hostname,
        URL: item.querySelector(config.link).getAttribute('href'),
        discount: Number(item.querySelector(config.discount).textContent.replace(/[^\w]/g, '')),
        image: item.querySelector(config.coverImgageBackground).getAttribute('src'),
        originalPrice: Number(item.querySelector(config.originalPrice).textContent.replace(/[^\w]/g, '')),
        currentPrice: Number(item.querySelector(config.currentPrice).textContent.replace(/[^\w]/g, '')),
      });
    });
    console.log(data);
    return Array.from(new Set(data));
  }
  catch (err) { console.log(err.message); }
};