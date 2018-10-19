exports.script = async() => {
  const config = {
    protocol: 'https://',
    hostname: 'www.lazada.vn',
    item: '.c2prKC',
    link: '.cRjKsc a',
    coverImgageBackground: '.cRjKsc a img',
    originalPrice: 'del.c13VH6',
    currentPrice: 'span.c13VH6',
    percentage: '.c1hkC1'
  };
  try {
    const data = [];
    
    const items = document.querySelectorAll('.c2prKC');
    console.log(items);
    items.forEach(async item => {
      const titleElement = item.querySelector(".cRjKsc a img");
      console.log(titleElement);
      const percentageElement = item.querySelector(config.percentage);
      const originalPriceElement = item.querySelector(config.originalPrice);
      const imageElement = item.querySelector(config.coverImgageBackground);
      if (titleElement && imageElement && percentageElement && originalPriceElement) {
        data.push({
          title: item.querySelector(config.coverImgageBackground).getAttribute("alt"),
          hostname: config.hostname,
          URL: item.querySelector(config.link).getAttribute("href"),
          percentage: Number(item.querySelector(config.percentage).textContent.replace(/[^\w]/g, '')),
          image: item.querySelector(config.coverImgageBackground).getAttribute('src'),
          originalPrice: Number(item.querySelector(config.originalPrice).textContent.replace(/[^\w]/g, '')),
          currentPrice: Number(item.querySelector(config.currentPrice).textContent.replace(/[^\w]/g, '')),
        });
      }
    });
    return items;
    //return Array.from(new Set(data));
  }
  catch (err) { console.log(err.message); }
};