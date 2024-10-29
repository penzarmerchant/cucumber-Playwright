import {Given,When,Then} from '@cucumber/cucumber'
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { AccountPage } from '../pages/accountPage';
import { CreateAccountPage } from '../pages/createAccountPage';
import { AccountInfoPage } from '../pages/accountInfoPage';
import { EspoCRM } from "../testData/espoCRMTypes";
import {readFile} from "fs/promises";

let espoCRM;
let loginPage:LoginPage
let homepage: HomePage;
let accountPage: AccountPage;
let createAccountPage: CreateAccountPage;
let accountInfoPage:AccountInfoPage;

Given('user logs in', async function () {
    loginPage=new LoginPage(pageFixture.page);
    homepage=new HomePage(pageFixture.page);
    accountPage=new AccountPage(pageFixture.page);
    createAccountPage=new CreateAccountPage(pageFixture.page);
    accountInfoPage=new AccountInfoPage(pageFixture.page);
    await pageFixture.page.goto('https://demo.us.espocrm.com/?l=en_GB');
    await loginPage.clickLoginButton();
  });

  When('user clicks on account button', async function () {
    await homepage.clickAccountButton();
  });

  When('user clicks on create account button', async function () {
    await accountPage.clickCreateAccountButton();
  });

  When('user enters all the fields and clicks on the save button', async function () {
    await createAccountPage.createCompleteAccount();
  });

  Then('user will be navigated to the accountInfo page', async function () {
    espoCRM = JSON.parse(
      await readFile("src/test/testData/espoCRM.json", "utf-8")
    ) as EspoCRM;
    expect(await accountInfoPage.getAccountTitleText()).toEqual(
      espoCRM.nameofAccount);
  });