// crontab -e

// whichnode=$(which node)
// croncmd="$whichnode heraldNews.js"
// crontab "10 2 * * * $croncmd  // every 2.10am

// SET @@global.sql_mode= 'NO_ENGINE_SUBSTITUTION';

//  npx sequelize-cli db:migrate

// const { Items } = require('../models');

const request = require("request-promise");
const regularRequest=require('request');
const cheerio=require("cheerio");
const Nightmare=require("nightmare");
const nightmare=Nightmare({show:false});  // show browser
const fs=require('fs');

const sampleResult={
    title:"STONE ISLAND",
    description:"와펜 맨투맨 색상 731563020",
    price:'351,000원',
    descriptionUrl: 'https://www.balaan.co.kr/shop/goods/goods_view.php?goodsno=4007809',
    imageUrl: "http://res.heraldm.com/content/image/2020/02/14/20200214000472_0.jpg"
};

async function scrape(pageIdx){
   //  const result=await request.get('');
   //  const $=await cheerio.load(result);

    await nightmare.goto('https://www.balaan.co.kr/shop/goods/goods_list.php?category=010001'+'&page='+pageIdx);
      

    const result = await nightmare.evaluate(() => {
      return document.body.innerHTML;   // result gets the body of the page
    });

    // const result=await request.get('http://biz.heraldcorp.com/list.php?ct=010301000000');
    

    const $=await cheerio.load(result);
    const items=$('#goods_list_area > li')
       .map((i, element)=>{
           const title=$(element)
              .find('div.info_area > a > dl > dt').text()
              
           const description=$(element)
              .find('div.info_area > a > dl > dd > p') 
              .text();   

           const price=$(element)
              .find('div.info_area > a > dl > dd > div > div.price') 
              .text().trim();   
              
           const descriptionUrl='https://www.balaan.co.kr'+$(element)
              .find('div.thumb_area > div.thumb > a')
              .attr('href');
            
           const imageUrl=$(element)
              .find('div.thumb_area > div.thumb > a > img')
              .attr('data-original');

           return {title, description, price, descriptionUrl, imageUrl};
       })
       .get()
    return items;
}

// async function scrapeImageUrl(items){
//     for(let i=0 ; i<items.length ; i++){
//        if(items[i].descriptionUrl===undefined) continue;
//        let descriptionUrl='https://www.balaan.co.kr'+items[i].descriptionUrl
//         try{
//             const imageUrl=await nightmare.goto(descriptionUrl)
//             .evaluate(()=>
//             $('#goods_view > div > ul > li:nth-child(2) > img').attr('src')
//             )
//           items[i].imageUrl=imageUrl;
//         } catch(err){
//             console.error(err);
//         }
//     }
//     await nightmare.end()
//     return items;
// }

async function itemsScraper(){
   let items=[];
   for(let i=1 ; i<3 ; i++){
      let data=await scrape(i);
      // console.log(Array.isArray(data));
      // items.concat(data);
      items=[...items, ...data];
      // console.log(data)
   }
    // let imageAdded=await scrapeImageUrl(items);
    console.log(items);
    console.log(items.length);

//     Items.destroy({
//         where: {},
//         truncate: true
//    })

//    for(let i=0 ; i<items.length ; i++){
//    Items.create({title : items[i].title, price : items[i].price, description : items[i].description,
//     imageUrl : items[i].imageUrl})
//         .then((data, err) => {
//           if(err) console.log('items insertion error')
//           else console.log('items scraped')
//         });
//    }
}

itemsScraper();