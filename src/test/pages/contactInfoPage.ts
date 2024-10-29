import {Page,Locator,} from '@playwright/test'
import BasePage from './basepage';

export class ContactInfoPage extends BasePage
{
    private readonly contactNameTitle:Locator;
    private readonly overviewText:Locator;

    constructor(page: Page) {
        super(page);
        this.page=page;
        this.contactNameTitle = page.locator('.header-title .title');
        this.overviewText=page.locator('//h4[@class="panel-title"][contains(text(),"Overview")]');
    }
    
    async waitForContactInfoPageToLoad():Promise<void>{
        await this.waitForPageToLoad();
        await this.waitForElementVisible(this.overviewText);
    }
    
    async getContactTitleText(): Promise<string> {
        await this.waitForContactInfoPageToLoad();
        return await this.getElementText(this.contactNameTitle);
      }
}