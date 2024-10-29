import { Page, Locator } from "@playwright/test";
import BasePage from "./basepage";
import { generateMockData } from "../testData/generateTestData";
import {readFile} from "fs/promises";
import { EspoCRM } from "../testData/espoCRMTypes";
import * as constantsData from "../testData/constants.json"
import { calendarHandling } from "../helpers/utils";

export class CreateContactPage extends BasePage {
  private readonly salutationDropdown: Locator;
  private readonly salutationDropdownValues:Locator;
  private readonly firstNameTextBox: Locator;
  private readonly lastNameTextBox: Locator;
  private readonly accountsDropDown:Locator;
  private readonly firstSearchAccountResult:Locator;
  private readonly emailTextBox: Locator;
  private readonly phoneNumberTextBox: Locator;
  private readonly streetTextBox: Locator;
  private readonly cityDropDown: Locator;
  private readonly cityDropdownValues:Locator;
  private readonly countyTextBox: Locator;
  private readonly postalTextBox: Locator;
  private readonly countryTextBox: Locator;
  private readonly descriptionTextBox: Locator;
  private readonly assignedUserDropDown: Locator;
  private readonly assignedUserDropDownValues: Locator;
  private readonly teamsDropDown: Locator;
  private readonly teamsDropDownValues: Locator;
  private readonly saveButton: Locator;
  private readonly nameErrorMessage: Locator;
  private readonly calendarTextBox:Locator;
  private readonly calendarPrevMonthButton:Locator;
  private readonly calendarNextMonthButton:Locator;
  private readonly calendarMonthYearButton:Locator;
  private readonly photoUpload:Locator;
  private readonly uploadingPhotoText:Locator;
  private readonly accountSearchResultNameText:Locator;
  private readonly searchBarTextBox:Locator;
  private readonly searchIcon:Locator;
  

  constructor(page: Page) {
    super(page);
    this.page=page;
    this.salutationDropdown=page.locator('[data-name="name"] div .items .item');
    this.salutationDropdownValues=page.locator('.selectize-dropdown-content .option')
    this.firstNameTextBox = page.locator('input[data-name="firstName"]');
    this.lastNameTextBox = page.locator('input[data-name="lastName"]');
    this.accountsDropDown=page.locator('div[data-name="accounts"] button[data-action="selectLink"]');
    this.firstSearchAccountResult=page.locator('(//td[@data-name="name"]//child::a)[1]')
    this.emailTextBox = page.locator('input[type="email"]');
    this.phoneNumberTextBox = page.locator(".phone-number");
    this.streetTextBox = page.locator('[data-name="addressStreet"]');
    this.cityDropDown = page.locator(
      '[data-name="addressCity"]'
    );
    this.cityDropdownValues=page.locator('.autocomplete-suggestions>.autocomplete-suggestion');
    this.countyTextBox = page.locator(
      '[data-name="addressState"]'
    );
    this.postalTextBox = page.locator(
      '[data-name="addressPostalCode"]'
    );
    this.countryTextBox = page.locator(
      '[data-name="addressCountry"]'
    );
    this.photoUpload=page.locator('label[title="Attach File"]');
    this.uploadingPhotoText=page.locator('.uploading-message');
    this.descriptionTextBox = page.locator('textarea[data-name="description"]');
    this.assignedUserDropDown = page.locator('input[data-name="assignedUserName"]');
    this.assignedUserDropDownValues=page.locator('.autocomplete-suggestions>.autocomplete-suggestion')
    this.teamsDropDown = page.locator('div[data-name="teams"] input');
    this.teamsDropDownValues=page.locator('.autocomplete-suggestions>.autocomplete-suggestion');
    this.saveButton = page.locator('button[data-name="save"]');
    this.nameErrorMessage = page.locator("#notification");
    this.calendarTextBox=page.locator('div[data-name="birthday"] input');
    this.calendarPrevMonthButton=page.locator('.datepicker-days th.prev');
    this.calendarNextMonthButton=page.locator('.datepicker-days th.next');
    this.calendarMonthYearButton=page.locator('.datepicker-days th.datepicker-switch');
    this.accountSearchResultNameText=page.locator('(//td[@data-name="name"])[6]');
    this.searchBarTextBox=page.locator('input[data-name="textFilter"]');
    this.searchIcon=page.locator('button[data-action="search"]');
  }

  async waitForCreateContactPageToLoad():Promise<void>{
    await this.waitForPageToLoad();
    await this.waitForElementVisible(this.teamsDropDown);
}

  async enterSalutations(salutationText: string) {
    await this.waitForCreateContactPageToLoad();
    await this.selectDynamicDropDown(this.salutationDropdown,this.salutationDropdownValues,salutationText)
  }

  async enterFirstName(firstNameText: string) {
    await this.fillField(this.firstNameTextBox, firstNameText);
  }

  async enterLastName(lastNameText: string) {
    await this.fillField(this.lastNameTextBox, lastNameText);
  }

  async selectAccount(){
      await this.clickelement(this.accountsDropDown);
      const searchNameText=(await this.accountSearchResultNameText.textContent()).trim();
      await this.fillField(this.searchBarTextBox,searchNameText);
      await this.clickelement(this.searchIcon);
      await this.clickelement(this.firstSearchAccountResult);
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

  async enterDescription(descriptionText: string) {
    await this.fillField(this.descriptionTextBox, descriptionText);
  }

  async enterAssignedUser(userText:string) {
    await this.selectDynamicDropDown(this.assignedUserDropDown,this.assignedUserDropDownValues,userText);
  }

  async enterTeams(teamsText:string) {
    await this.selectDynamicDropDown(this.teamsDropDown,this.teamsDropDownValues,teamsText);
  }

  async clickSave() {
    await this.clickelement(this.saveButton);
  }

  async getNameErrorText(): Promise<string> {
    return await this.getElementText(this.nameErrorMessage);
  }

  async selectCalendar(date:Number,monthYear:string){
      await this.clickelement(this.calendarTextBox);
      await calendarHandling(this.page,date,monthYear,this.calendarPrevMonthButton,this.calendarMonthYearButton,this.calendarNextMonthButton);
  }

  async uploadPhoto(){
    await this.photoUpload.setInputFiles(constantsData.uploadImage);
    await this.waitForElementHidden(this.uploadingPhotoText);
  }

  async createCompleteContact() {
    await generateMockData("src/test/testData/espoCRM.json");
    await new Promise((resolve) => setTimeout(resolve, 500));
    const espoCRM = JSON.parse(
    await readFile("src/test/testData/espoCRM.json", "utf-8")) as EspoCRM;
    await this.uploadPhoto();
    await this.enterSalutations(constantsData.salutation);  
    await this.enterFirstName(espoCRM.firstName);
    await this.enterLastName(espoCRM.lastName);
    await this.selectAccount();
    await this.enterEmail(espoCRM.email);
    await this.enterPhoneNumber(espoCRM.phoneNumber);
    await this.enterStreet(espoCRM.streetAddress);
    await this.enterCity(constantsData.city);
    await this.enterCounty(espoCRM.county);
    await this.enterPostalCode(espoCRM.postalCode);
    await this.enterCountry(espoCRM.country);
    await this.enterAssignedUser(constantsData.assignedUser);
    await this.enterTeams(constantsData.teams);
    await this.selectCalendar(constantsData.date,constantsData.monthYear);
    await this.clickSave();
  }
}