import { Page, Locator } from "@playwright/test";
import BasePage from "./basepage";
import { generateMockData } from "../testData/generateTestData";
import {readFile} from "fs/promises";
import { EspoCRM } from "../testData/espoCRMTypes";
import * as constantsData from "../testData/constants.json"

export class CreateAccountPage extends BasePage {
  private readonly nameTextBox: Locator;
  private readonly websiteTextBox: Locator;
  private readonly emailTextBox: Locator;
  private readonly phoneNumberTextBox: Locator;
  private readonly streetTextBox: Locator;
  private readonly cityDropDown: Locator;
  private readonly cityDropdownValues:Locator;
  private readonly countyTextBox: Locator;
  private readonly postalTextBox: Locator;
  private readonly countryTextBox: Locator;
  private readonly typeDropDown: Locator;
  private readonly typeDropDownValues: Locator;
  private readonly industryDropDown: Locator;
  private readonly industryDropDownValues: Locator;
  private readonly descriptionTextBox: Locator;
  private readonly assignedUserDropDown: Locator;
  private readonly assignedUserDropDownValues: Locator;
  private readonly teamsDropDown: Locator;
  private readonly teamsDropDownValues: Locator;
  private readonly copyButton: Locator;
  private readonly saveButton: Locator;
  private readonly nameErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.page=page;
    this.nameTextBox = page.locator('input[data-name="name"]');
    this.websiteTextBox = page.locator('input[data-name="website"]');
    this.emailTextBox = page.locator('input[type="email"]');
    this.phoneNumberTextBox = page.locator(".phone-number");
    this.streetTextBox = page.locator('[data-name="billingAddressStreet"]');
    this.cityDropDown = page.locator(
      '[data-name="billingAddressCity"]'
    );
    this.cityDropdownValues=page.locator('.autocomplete-suggestions>.autocomplete-suggestion');
    this.countyTextBox = page.locator(
      '[data-name="billingAddressState"]'
    );
    this.postalTextBox = page.locator(
      '[data-name="billingAddressPostalCode"]'
    );
    this.countryTextBox = page.locator(
      '[data-name="billingAddressCountry"]'
    );
    this.typeDropDown = page.locator('div[data-name="type"][class="field"]');
    this.typeDropDownValues=page.locator('.selectize-dropdown-content>.option')
    this.industryDropDown = page.locator(
      'div[data-name="industry"][class="field"]'
    );
    this.industryDropDownValues=page.locator('.selectize-dropdown-content>.option');
    this.descriptionTextBox = page.locator('textarea[data-name="description"]');
    this.assignedUserDropDown = page.locator('input[data-name="assignedUserName"]');
    this.assignedUserDropDownValues=page.locator('.autocomplete-suggestions>.autocomplete-suggestion')
    this.teamsDropDown = page.locator('div[data-name="teams"] input');
    this.teamsDropDownValues=page.locator('.autocomplete-suggestions>.autocomplete-suggestion');
    this.copyButton = page.locator("button", { hasText: "Copy Billing" });
    this.saveButton = page.locator('button[data-name="save"]');
    this.nameErrorMessage = page.locator("#notification");
  }

  async waitForCreateAccountPageToLoad():Promise<void>{
    await this.waitForPageToLoad();
    await this.waitForElementVisible(this.teamsDropDown);
}

  async enterName(nameText: string) {
    await this.waitForCreateAccountPageToLoad();
    await this.fillField(this.nameTextBox, nameText);
  }

  async enterWebsite(websiteText: string) {
    await this.fillField(this.websiteTextBox, websiteText);
  }

  async enterEmail(emailText: string) {
    await this.fillField(this.emailTextBox, emailText);
  }

  async enterPhoneNumber(phoneNumberText: string) {
    await this.fillField(this.phoneNumberTextBox, phoneNumberText);
  }

  async enterStreet(streetText: string) {
    await this.fillField(this.streetTextBox, streetText);
  }

  async enterCity(cityText:string) {
    await this.selectDynamicDropDown(this.cityDropDown,this.cityDropdownValues,cityText);
  }

  async enterCounty(countyText: string) {
    await this.fillField(this.countyTextBox, countyText);
  }

  async enterPostalCode(postalCodeText: string) {
    await this.fillField(
      this.postalTextBox,
      postalCodeText
    );
  }

  async enterCountry(countryText: string) {
    await this.fillField(this.countryTextBox, countryText);
  }

  async enterType(typeText:string) {
      await this.selectDynamicDropDown(this.typeDropDown,this.typeDropDownValues,typeText);
  }

  async enterIndustry(industryText:string) {
    await this.selectDynamicDropDown(this.industryDropDown,this.industryDropDownValues,industryText)
  }

  async enterDescription(descriptionText: string) {
    await this.fillField(this.descriptionTextBox, descriptionText);
  }

  async enterAssignedUser(userText:string) {
    await this.selectDynamicDropDown(this.assignedUserDropDown,this.assignedUserDropDownValues,userText);
  }

  async enterTeams(teamsText:string) {
    await this.selectDynamicDropDown(this.teamsDropDown,this.teamsDropDownValues,teamsText);
  }

  async clickCopyButton() {
    await this.clickelement(this.copyButton);
  }

  async clickSave() {
    await this.clickelement(this.saveButton);
  }

  async getNameErrorText(): Promise<string> {
    return await this.getElementText(this.nameErrorMessage);
  }

  async createCompleteAccount() {
    await generateMockData("src/test/testData/espoCRM.json");
    await new Promise((resolve) => setTimeout(resolve, 500));
    const espoCRM = JSON.parse(
      await readFile("src/test/testData/espoCRM.json", "utf-8")) as EspoCRM;
    await this.enterName(espoCRM.nameofAccount);
    await this.enterWebsite(espoCRM.website);
    await this.enterEmail(espoCRM.email);
    await this.enterPhoneNumber(espoCRM.phoneNumber);
    await this.enterStreet(espoCRM.streetAddress);
    await this.enterCity(constantsData.city);
    await this.enterCounty(espoCRM.county);
    await this.enterPostalCode(espoCRM.postalCode);
    await this.enterCountry(espoCRM.country);
    await this.clickCopyButton();
    await this.enterAssignedUser(constantsData.assignedUser);
    await this.enterTeams(constantsData.teams);
    await this.enterType(constantsData.type);
    await this.enterIndustry(constantsData.industry)
    await this.clickSave();
  }
}