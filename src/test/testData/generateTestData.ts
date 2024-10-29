import { faker } from '@faker-js/faker'
import {readFile,writeFile} from "fs/promises";

export async function generateMockData(filePath: string): Promise<any> {
  try {
    const jsonData = await readFile(filePath, "utf-8");
    const data = JSON.parse(jsonData);
    const fakedata = {
      nameofAccount: faker.company.name(),
      website: faker.internet.domainName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      streetAddress: faker.location.streetAddress(),
      postalCode: faker.location.zipCode(),
      county: faker.location.county(),
      country: faker.location.country(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };
    const updatedData = { ...data, ...fakedata };
    await writeFile(filePath, JSON.stringify(updatedData, null, 2));
    return updatedData;
  } catch (error) {
    console.error("error in generating mock data  ", error);
    throw error;
  }
}
