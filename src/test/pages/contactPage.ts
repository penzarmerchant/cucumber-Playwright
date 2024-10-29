import { Page, Locator } from "@playwright/test";
import BasePage from "./basepage";

export class ContactPage extends BasePage {
  private readonly allSearchResultsRow:Locator;
  private readonly createContactButton: Locator;
  private readonly searchTextBox: Locator;
  private readonly searchIcon: Locator;
  private readonly firstSearchResultContactName: Locator;
  private readonly searchResultContactName: Locator;

  constructor(page: Page) {
    super(page);
    this.page=page;
    this.allSearchResultsRow=page.locator('.table tbody');
    this.createContactButton = page.locator('a[data-name="create"]');
    this.searchTextBox = page.locator('input[data-name="textFilter"]');
    this.searchIcon = page.locator('button[title="Search"]');
    this.firstSearchResultContactName = page.locator(
      '(//td[@data-name="name"])[1]'
    );
    this.searchResultContactName = page.locator('td[data-name="name"]');
  }

  async waitForContactPageToLoad():Promise<void>{
    await this.waitForPageToLoad();
    await this.waitForElementVisible(this.allSearchResultsRow);
}

  async clickCreateContactButton() {
    await this.waitForContactPageToLoad();
    await this.clickelement(this.createContactButton);
  }

  async enterNameOfContact(nameofContact: string) {
    await this.waitForContactPageToLoad();
    await this.fillField(this.searchTextBox, nameofContact);
  }

  async clickSearchIcon() {
    await this.clickelement(this.searchIcon);
    await this.waitForPageToLoad();
  }

  async getSearchResultCount(): Promise<number> {
    return await this.getElementCount(this.searchResultContactName);
  }

  async getFirstSearchResultContactName(): Promise<string> {
    return await this.getElementText(this.firstSearchResultContactName);
  }
}
