// crontab -e

// whichnode=$(which node)
// croncmd="$whichnode heraldNews.js"
// crontab "10 2 * * * $croncmd  // every 2.10am

// SET @@global.sql_mode= 'NO_ENGINE_SUBSTITUTION';

//  npx sequelize-cli db:migrate

const { items } = require('./models');

const cheerio=require("cheerio");
const Nightmare=require("nightmare");
const nightmare=Nightmare({show:false});  // show browser
const fs=require('fs');

const sampleResult={
    title:"THOM BROWNE",
    description:"사선완장 남성 가디건 MJT167A 00535",
    price:'796,000원',
    descriptionUrl: 'https://www.balaan.co.kr/shop/goods/goods_view.php?goodsno=4456312',
    imageUrl: 'https://i.balaan.io/goods/prod/202010/445/4456312-0.jpg'
};

const category={
   NewIn:'010001',
   Clothes:'010002',
   Shoes:'010003',
   Bags:'010004',
   Accessories:'010005',
   Jewelry:'010006'
}

async function scrape(pageIdx, key){
   //  const result=await request.get('');
   //  const $=await cheerio.load(result);

    await nightmare.goto('https://www.balaan.co.kr/shop/goods/goods_list.php?category='+category[key]+'&page='+pageIdx);
      

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
       .get();
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
   // let data={};
      let data=[];
   // for(const [key] of Object.entries(category)){
      for(let i=1 ; i<6 ; i++){
         let key='NewIn' // new in
         let scraped=await scrape(i,key);
         data=[...data, ...scraped];
         // console.log(Array.isArray(data));
         // items.concat(data);
         // if(!data[key]) data[key]=[];
         // data[key]=[...data[key], ...scraped];
         // console.log(data)
         // console.log(items[key].length);
      }
   // }
   
    // let imageAdded=await scrapeImageUrl(items);
    console.log(data);
   //  console.log(Object.keys(items));
    

   items.destroy({
        where: {},
        truncate: true
   })

   for(let i=0 ; i<data.length ; i++){
    items.create({title : data[i].title, description:data[i].description, price : data[i].price, descriptionUrl : data[i].descriptionUrl,
    imageUrl : data[i].imageUrl})
        .then((item, err) => {
          if(err) console.log('data insertion error')
          else console.log('data scraped')
        });
   }

   await nightmare.end();
}

itemsScraper();