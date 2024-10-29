import { Page,Locator } from "@playwright/test";
import { DateTime } from "luxon";

export async function calendarHandling(page:Page,date:Number,monthYear:string,prevMonthButton:Locator,monthYearDisplayText:Locator,nextMonthButton:Locator) {
const formattedMonth=DateTime.fromFormat(monthYear,"MMMM yyyy");  
while(await monthYearDisplayText.textContent()!=monthYear){
if(formattedMonth<DateTime.fromJSDate(new Date())){
await prevMonthButton.click();
}
else{
await nextMonthButton.click();
}
} 
await page.locator(`//td[@class="day"][text()="${date}"]`).click();
}
