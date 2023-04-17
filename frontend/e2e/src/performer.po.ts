import { browser, by, element } from 'protractor';
import * as faker from 'faker';


export class PerformerPage {
  navigateTo() {
    return browser.get('performers/list');
  }

  getPerformersList() {
    return element.all(by.css('.p-3.align-middle'));


  }

  getFirstPerformerElement() {
    return element.all(by.css('.p-3.align-middle')).first();
  }

  twoLetterName() {
    let twoletters = faker.lorem.word(1);
    return twoletters;
  }

   addPerformer(name: string, image: string, birthDate: Date, description: string
    ) : void {
    element(by.css('.btn.btn-standard.btn-sm')).click();

    element(by.id('name')).sendKeys(name);
    element(by.id('image')).sendKeys(image);
    element(by.id('birthDate')).sendKeys(birthDate.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }));
    element(by.id('description')).sendKeys(description);
    element(by.id('@@create')).click();
  }
}
