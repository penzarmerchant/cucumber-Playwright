import { Page, Locator } from "@playwright/test";

export default class BasePage {
   page: Page; // Global

  constructor(page: Page) {
    // Local
    this.page = page;
  }

  async navigateTo(url: string,maxTimeout?:number) {
    await this.page.goto(url,{timeout:maxTimeout,waitUntil:'networkidle'});
  }

  async clickelement(element: Locator,isForceClick?:boolean,maxTimeout?:number) {
    this.waitForElementVisible(element,maxTimeout);
    await element.click({force:isForceClick});
  }

  async fillField(element: Locator, text: string,isForceFill?:boolean,maxTimeout?:number) {
    this.waitForElementVisible(element,maxTimeout);
    await element.fill(text,{timeout:maxTimeout,force:isForceFill});
  }

  async waitForElementVisible(element: Locator | string,maxTimeout?:number) {
    if (typeof element === "string") {
      await this.page.waitForSelector(element, { state: "visible",timeout:maxTimeout});
    } else {
      await element.waitFor({ state: "visible",timeout:maxTimeout});
    }
  }

  async waitForElementHidden(element: Locator,maxTimeout?:number) {
    await element.waitFor({ state:'hidden',timeout:maxTimeout});
  }

  async getElementText(element: Locator,maxTimeout?:number): Promise<string> {
    this.waitForElementVisible(element,maxTimeout);
    return element.innerText({timeout:maxTimeout});
  }

  async isElementVisible(element: Locator,maxTimeout?:number): Promise<boolean> {
    this.waitForElementVisible(element,maxTimeout);
    return element.isVisible({timeout:maxTimeout});
  }

  async getElementCount(element: Locator,maxTimeout?:number): Promise<number> {
    this.waitForElementVisible(element,maxTimeout);
    return await element.count();
  }

  async waitForPageToLoad():Promise<void>{
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(1000);
  }

  async selectStaticDropDown(element:Locator,dropDownText:string):Promise<void>{
      await element.selectOption({
        label:dropDownText
      })
  }

  async selectDynamicDropDown(dropdownLocator:Locator,dropdownValuesLocator:Locator,dropDownText:string):Promise<void>{
    await dropdownLocator.click();
    const optionLocator= dropdownValuesLocator.locator(`text=${dropDownText}`);
    await optionLocator.waitFor({state:'visible'});
    await optionLocator.click();
  }


}
