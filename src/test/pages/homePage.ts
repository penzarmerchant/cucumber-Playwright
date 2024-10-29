import { Page, Locator } from "@playwright/test";
import BasePage from "./basepage";

export class HomePage extends BasePage {
  private readonly calendar:Locator;
  private readonly contactButton: Locator;
  private readonly accountButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page=page;
    this.calendar=page.locator('[data-name="Calendar"] .panel-body');
    this.accountButton = page.locator('li[data-name="Account"] a');
    this.contactButton = page.locator('li[data-name="Contact"] a');
  }

  async waitForHomePageToLoad():Promise<void>{
    await this.waitForPageToLoad();
    await this.waitForElementVisible(this.calendar);
}

  async clickContactButton() {
    await this.waitForHomePageToLoad();
    await this.clickelement(this.contactButton);
  }

  async clickAccountButton() {
    await this.waitForHomePageToLoad();
    await this.clickelement(this.accountButton);
  }
}
