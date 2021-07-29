const puppeteer = require('puppeteer');
const json2csv = require("json2csv").Parser;
const fs = require("fs");

const email = '****'
const passw = '****'

async function click(button){
    await button.evaluate(button => button.click());
}


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  } 
  
function match_category(c1,c2,c3){
    if(c1 == 'Technology' || c2 == 'Technology' || c3 == 'Technology'){
        return true;
    }
    else if(c1 == 'Comedy' || c2 == 'Comedy' || c3 == 'Comedy'){
        return true;
    }
    else if(c1 == 'Dance' || c2 == 'Dance' || c3 == 'Dance'){
        return true;
    }
    else if(c1 == 'Sport' || c2 == 'Sport' || c3 == 'Sport'){
        return true;
    }
    else{
        return false;
    }

}
(async () => {

    
    let count = 20;
    const target_url = 'https://creatormarketplace.tiktok.com/login';
    
    
    const browser = await puppeteer.launch({
        headless : false,
        defaultViewport: null,
    });


    const page = await browser.newPage();

    page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36");
    try{
        await page.setDefaultNavigationTimeout(0);
        await page.goto(target_url);
    }catch (e) {
        console.log(e);
    }

    await page.waitForSelector('body > div > div.passport-panel > div.box');

    await page.waitForSelector('#TikTok_Ads_SSO_Login_Email_Input', {timeout : 100});
    console.log('Got the Eamil box');

    await page.type('#TikTok_Ads_SSO_Login_Email_Input',email,{delay : 50});
    console.log('Email Input Complete');

    await page.waitForSelector("#TikTok_Ads_SSO_Login_Pwd_Input", {timeout : 100});
    console.log('Got the Password box');


    await page.type("#TikTok_Ads_SSO_Login_Pwd_Input",passw, {delay : 80});
    console.log('Password Input Complete');

    await page.click('#TikTok_Ads_SSO_Login_Btn');

   
    console.log(1);
    await sleep(10000);
    console.log(2);
    details = [];

    for(let i=1;i<1000;i++){
        let cetagory1 = '';
        let cetagory2 = '';
        let cetagory3 = '';
        
        let info = {};
              
        await page.waitForSelector(`#star-layout-content > div.market > div > div > div.cards-wrapper > div > div:nth-child(${i}) > div > div.card-container > div.card-info > div.card-name.star-nowrap`,{timeout : 5000})
    
        try{
            let cetagory1_element = await page.$(`#star-layout-content > div.market > div > div > div.cards-wrapper > div > div:nth-child(${i}) > div > div.card-container > div.card-info > div.card-topics > div > span:nth-child(1)`)
            cetagory1 = await page.evaluate(el => el.textContent, cetagory1_element);
            cetagory1 = cetagory1.trim();
            }catch{
                console.log('Not Found');
            }

        try{
        let cetagory2_element = await page.$(`#star-layout-content > div.market > div > div > div.cards-wrapper > div > div:nth-child(${i}) > div > div.card-container > div.card-info > div.card-topics > div > span:nth-child(2)`)
        cetagory2 = await page.evaluate(el => el.textContent, cetagory2_element);
        cetagory2 = cetagory2.trim();
        }catch{
            console.log('Not Found');
        }

        try{
            let cetagory3_element = await page.$(`#star-layout-content > div.market > div > div > div.cards-wrapper > div > div:nth-child(${i}) > div > div.card-container > div.card-info > div.card-topics > div > span:nth-child(3)`)
            cetagory3 = await page.evaluate(el => el.textContent, cetagory3_element);
            cetagory3= cetagory3.trim();
        }catch{
            console.log('Not Found');
        }
         if(match_category(cetagory1,cetagory2,cetagory3)){

            let name_element = await page.$(`#star-layout-content > div.market > div > div > div.cards-wrapper > div > div:nth-child(${i}) > div > div.card-container > div.card-info > div.card-name.star-nowrap > span:nth-child(1)`);
            let name = await page.evaluate(el => el.textContent, name_element);

            await console.log("name............");

            try{
            let followers_element = await page.$(`#star-layout-content > div.market > div > div > div.cards-wrapper > div > div:nth-child(${i}) > div > div.card-container > div.card-info > div.card-numinfo > div:nth-child(1) > div.numinfo-val`);
            let followers = await page.evaluate(el => el.textContent, followers_element);

            await console.log("follwers............");
            
            let Views_element = await page.$(`#star-layout-content > div.market > div > div > div.cards-wrapper > div > div:nth-child(${i}) > div > div.card-container > div.card-info > div.card-numinfo > div:nth-child(2) > div.numinfo-val`);
            let views = await page.evaluate(el => el.textContent, Views_element);

            await console.log("views............");

            let userName_elem = await page.$(`#star-layout-content > div.market > div > div > div.cards-wrapper > div > div:nth-child(${i}) > div > div.card-container > div.card-info > div.handle-name.card-handle-name > span:nth-child(2)`);
            let userName = await page.evaluate(el => el.textContent, userName_elem);

            await console.log("Likes............");

            let Gender_element = await page.$(`#star-layout-content > div.market > div > div > div.cards-wrapper > div > div:nth-child(${i}) > div > div.card-container > div.card-info > div.author-audience > div:nth-child(2) > div.profile-title`);
            let gender = await page.evaluate(el => el.textContent, Gender_element);

            await console.log("Gender............");

            let Gender_P_element = await page.$(`#star-layout-content > div.market > div > div > div.cards-wrapper > div > div:nth-child(${i}) > div > div.card-container > div.card-info > div.author-audience > div:nth-child(2) > div.profile-val`);
            let Gender_P = await page.evaluate(el => el.textContent, Gender_P_element);

            
            
            info.Cetagory = await cetagory1 + ', ' + cetagory2 + ', '+ cetagory3;
            info.Name = await name.trim();
            info.Followers = await followers.trim();
            info.Views = await views.trim();
            info.UserName = await '@' + userName.trim();
            info.Gender = await gender.trim();
            info.Gender_Perchantage = await Gender_P.trim();
        }catch{
            console.log("Not Found");
        }
            console.log(info);

         }
            await details.push(info);

            console.log(i);

            if(i == count){

              await sleep(3000);
              
            //   let [popup] = await Promise.all([
            //     new Promise((resolve) => page.once('popup', async p => {
            //       await p.waitForNavigation({ waitUntil: 'networkidle0' });
            //       await console.log('Navigation complete------')
            //       resolve(p);
            //       console.log('resolve');
                
            //     })),
            //     await page.click(`#star-layout-content > div.market > div > div > div.cards-wrapper > div > div:nth-child(${i}) > div > div.card-container > div.card-info > div.card-name.star-nowrap`),
            //     await console.log("Clicked..........."),
                
            //   ]);
              
            //   popup.close();
              
              count = count + 20;
                
            }

        
    }

    // console.log(details);
    const j2cp = new json2csv();
    const csv = j2cp.parse(details);

    fs.appendFileSync("./Tiktok_Creators_info.csv", csv, "utf-8");

    browser.close();

})();