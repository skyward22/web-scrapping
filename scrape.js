const axios = require("axios");
const cheerio = require("cheerio");

const url =
  "https://www.amazon.com/dp/B09TB82LXD?pd_rd_i=B09TB82LXD&pf_rd_p=0e085ce4-a814-4f4b-b24c-1b9dbfa919e0&pf_rd_r=H9CDSVQDJGV3FZABJ8VG&pd_rd_wg=Hky5K&pd_rd_w=pGl8j&pd_rd_r=9cfbef6d-8ec2-40a5-842d-6804575215db";

const product = { name: "", price: "", link: "" };

const scrape = async () => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const item = $("div#dp");
    product.name = $(item).find("h1 span#productTitle").text();
    product.link = url;
    const price = $(item)
      .find("span .a-price-whole")
      .first()
      .text()
      .replace(/[,.]/g, "");
    const priceNum = parseInt(price);
    product.price = priceNum;
    console.log(product);
  } catch (err) {
    console.error(err);
  }
};

// async function scrape() {
//   const { data } = await axios.get(url);
//   const $ = cheerio.load(data);
//   const item = $("div#dp");
//   product.name = $(item).find("h1 span#productTitle").text();
//   product.link = url;
//   const price = $(item)
//     .find("span .a-price-whole")
//     .first()
//     .text()
//     .replace(/[,.]/g, "");
//   const priceNum = parseInt(price);
//   product.price = priceNum;
//   console.log(product);
// }

scrape();
