import { browser, by, element } from 'protractor';
import * as faker from 'faker';


export class PrizePage {
  navigateTo() {
    return browser.get('prizes/list');
  }

  getPrizeList() {
    return element.all(by.css('.p-3.align-middle'));


  }

  getFirstPrizeElement() {
    return element.all(by.css('.p-3.align-middle')).first();
  }

  twoLetterName() {
    let twoletters = faker.lorem.word(1);
    return twoletters;
  }

   addPrize(organization: string, name: string, description: string
    ) : void {
    element(by.css('.btn.btn-standard.btn-sm')).click();

    element(by.id('organization')).sendKeys(organization);
    element(by.id('name')).sendKeys(name);
    element(by.id('description')).sendKeys(description);
    element(by.id('@@create')).click();
  }
}
