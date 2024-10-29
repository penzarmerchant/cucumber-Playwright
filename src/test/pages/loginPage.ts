import { Page, Locator } from "@playwright/test";
import BasePage from "./basepage";

export class LoginPage extends BasePage {
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page=page;
    this.loginButton = page.locator("#btn-login");
  }

  async waitForLoginPageToLoad(): Promise<void> {
    await this.waitForPageToLoad();
    await this.waitForElementVisible(this.loginButton);
  }

  async clickLoginButton() {
    await this.waitForLoginPageToLoad();
    await this.clickelement(this.loginButton);
  }
}