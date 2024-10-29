import {Given,When,Then} from '@cucumber/cucumber'
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';

Given('user logs in', async function () {
    await pageFixture.page.goto('https://demo.us.espocrm.com/?l=en_GB');
    await pageFixture.page.locator('#btn-login').click();
  });

  When('user clicks on account button', async function () {
    await pageFixture.page.locator('li[data-name="Account"] a').click();
  });

  When('user clicks on create account button', async function () {
    await pageFixture.page.locator('a[data-name="create"]').click();
  });

  When('user enters all the fields and clicks on the save button', async function () {
    await pageFixture.page.locator('input[data-name="name"]').fill('ABC Consulting Private Limited');
    await pageFixture.page.locator('button[data-name="save"]').click();
  });

  Then('user will be navigated to the accountInfo page', async function () {
    expect(pageFixture.page.locator('.header-title .title').textContent()).toEqual('ABC Consulting Private Limited');
  });