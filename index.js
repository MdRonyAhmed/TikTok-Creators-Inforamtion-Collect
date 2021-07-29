const puppeteer = require('puppeteer');
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
(async () => {

    

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

  

    for(let i=1;i<100;i++){
              
    await page.waitForSelector(`#star-layout-content > div.market > div > div > div.cards-wrapper > div > div:nth-child(${i}) > div > div.card-container > div.card-info > div.card-name.star-nowrap`)

    let element = await page.$(`#star-layout-content > div.market > div > div > div.cards-wrapper > div > div:nth-child(${i}) > div > div.card-container > div.card-info > div.card-topics > div > span`)
    let value = await page.evaluate(el => el.textContent, element);
    // await page.click(`#star-layout-content > div.market > div > div > div.cards-wrapper > div > div:nth-child(${i})`)
    info = {};
    
    if(value.trim() == "Technology" || value.trim() == "Vlog" ){
      
      // const stopPromise = new Promise(x => stopCallback = x);
      await sleep(1000);
      
        let [popup] = await Promise.all([
            new Promise((resolve) => page.once('popup', async p => {
              await p.waitForNavigation({ waitUntil: 'networkidle0' });
              await console.log('Navigation complete------')
              resolve(p);
              console.log('resolve');
            
            })),
            await page.click(`#star-layout-content > div.market > div > div > div.cards-wrapper > div > div:nth-child(${i})`),
            await console.log("Clicked..........."),
            
          ]);
        
        await console.log("Clicked complete............");
        
        let name_element = await popup.$('#star-layout-content > main > section > div > div.base-info-author > div.card-info > div.card-name.star-nowrap');
        let name = await popup.evaluate(el => el.textContent, name_element);

        await console.log("name............");

        let followers_element = await popup.$('#star-layout-content > main > section > div > div.base-info-author > div.card-info > div.card-numinfo > div:nth-child(1) > div.numinfo-val');
        let followers = await popup.evaluate(el => el.textContent, followers_element);

        await console.log("follwers............");

        let Views_element = await popup.$('#star-layout-content > main > section > div > div.base-info-author > div.card-info > div.card-numinfo > div:nth-child(2) > div.numinfo-val');
        let views = await popup.evaluate(el => el.textContent, Views_element);

        await console.log("views............");

        let Likes_element = await popup.$('#star-layout-content > main > section > section > div.content-stat > div.card-panel.stat-item-container.core-stats > div > div > div.indicator-list > span:nth-child(2) > div.value');
        let Likes = await popup.evaluate(el => el.textContent, Likes_element);

        await console.log("Likes............");

        let Gender_element = await popup.$('#star-layout-content > main > section > div > div.base-info-author > div.card-info > div.card-profiles > div:nth-child(2) > div.profile-title');
        let gender = await popup.evaluate(el => el.textContent, Gender_element);

        await console.log("Gender............");

        let Gender_P_element = await popup.$('#star-layout-content > main > section > div > div.base-info-author > div.card-info > div.card-profiles > div:nth-child(2) > div.profile-val');
        let Gender_P = await popup.evaluate(el => el.textContent, Gender_P_element);

        info.Name = await name.trim();
        info.Followers = await followers.trim();
        info.Views = await views.trim();
        info.Likes = await Likes.trim();
        info.Gender = await gender.trim();
        info.Gender_Perchantage = await Gender_P.trim();

        await console.log("Info............");

        // pages = popup;
       
        await popup.click('body > main > div.header-wrapper > div > div.nav-header-inner > div.left > div > ul > li:nth-child(2)');
       
        // await popup.close();
        console.log("Close..............")

        

    }
    await sleep(1000);

   
   
    console.log(info);
    
}

console.log("End");
    
    
    
})();