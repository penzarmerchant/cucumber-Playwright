import { Before,BeforeAll,AfterAll,After, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser,Page,chromium,BrowserContext} from "@playwright/test";
import { pageFixture } from "./pageFixture";

let browser:Browser;
let page:Page;
let context:BrowserContext;

setDefaultTimeout(60000);

BeforeAll(async function(){
    browser=await chromium.launch({headless:false});
})

AfterAll(async function() {
    await browser.close();
})

Before(async function(){
    context=await browser.newContext();
    page=await browser.newPage();
    pageFixture.page=page;
})

After(async function() {
    await page.close();
    await context.close();
})