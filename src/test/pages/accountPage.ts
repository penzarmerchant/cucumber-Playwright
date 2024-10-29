import { Page, Locator } from "@playwright/test";
import BasePage from "./basepage";

export class AccountPage extends BasePage {
  private readonly allSearchResultsRow:Locator;
  private readonly createAccountButton: Locator;
  private readonly searchBarInputBox: Locator;
  private readonly searchIcon: Locator;
  private readonly firstSearchResultAccountName: Locator;
  private readonly searchResultAccountName: Locator;

  constructor(page: Page) {
    super(page);
    this.page=page;
    this.allSearchResultsRow=page.locator('.table tbody');
    this.createAccountButton = page.locator('a[data-name="create"]');
    this.searchBarInputBox = page.locator('input[data-name="textFilter"]');
    this.searchIcon = page.locator('button[title="Search"]');
    this.firstSearchResultAccountName = page.locator(
      '(//td[@data-name="name"])[1]'
    );
    this.searchResultAccountName = page.locator('td[data-name="name"]');
  }

  async waitForAccountPageToLoad():Promise<void>{
    await this.waitForPageToLoad();
    await this.waitForElementVisible(this.allSearchResultsRow);
}

  async clickCreateAccountButton() {
    await this.waitForAccountPageToLoad();
    await this.clickelement(this.createAccountButton);
  }

  async enterNameOfAccount(nameofAccount: string) {
    await this.waitForAccountPageToLoad();
    await this.fillField(this.searchBarInputBox, nameofAccount);
  }

  async clickSearchIcon() {
    await this.clickelement(this.searchIcon);
    await this.waitForPageToLoad();
  }

  async getSearchResultCount(): Promise<number> {
    return await this.getElementCount(this.searchResultAccountName);
  }

  async getFirstSearchResultAccountName(): Promise<string> {
    return await this.getElementText(this.firstSearchResultAccountName);
  }
}