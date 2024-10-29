import {Page,Locator,} from '@playwright/test'
import BasePage from './basepage';

export class AccountInfoPage extends BasePage
{
    private readonly accountNameTitle: Locator;
    private readonly activitiesTab:Locator;

    constructor(page: Page) {
        super(page);
        this.page=page;
        this.accountNameTitle = page.locator(".header-title .title");
        this.activitiesTab=page.locator('div[data-name="activities"] .panel-heading');
    }

    async waitForAccountInfoPageToLoad():Promise<void>{
        await this.waitForPageToLoad();
        await this.waitForElementVisible(this.activitiesTab);
    }

    async getAccountTitleText(): Promise<string> {
        await this.waitForAccountInfoPageToLoad();
        return await this.getElementText(this.accountNameTitle);
      }
}