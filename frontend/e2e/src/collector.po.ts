import { browser, by, element } from 'protractor';

export class CollectorPage {
  navigateToList() {
    return browser.get('/collectors');
  }

  getCollectorsRows() {
    browser.sleep(1000);
    return element.all(by.css('table tbody tr'));
  }

  goToFirstCollector() {
    element(by.css('table tbody tr:first-child button'))
      .click();
  }

  getCollectorDetailTableName() {
    return element(by.css('.c-detail .row:first-child .col h2'));
  }

  goToAddCollector() {
    element(by.css('.collector-list-container h1 + div button'))
      .click();
  }

  createCollector(name: string, phone: number, email: string) {
    element(by.id('name')).sendKeys(name);
    element(by.id('telephone')).sendKeys(phone);
    element(by.id('email')).sendKeys(email);
    browser.sleep(500);
    element(by.css('main form button[type=submit]')).click();
    browser.sleep(2000);
  }

  goToAddAlbumToCollector() {
    element(by.css('.collector-list-container .add-collector-container:nth-child(3) button'))
      .click();
  }

  addAlbumToCollector(collectorName: string, price: number) {
    browser.sleep(2000);
    element(by.cssContainingText('option', collectorName)).click();
    element(by.cssContainingText('option', 'A Day at the Races')).click();
    element(by.id('price')).sendKeys(price);
    element(by.cssContainingText('option', 'Active')).click();
    browser.sleep(2000);
    element(by.css('main form button[type=submit]')).click();
    browser.sleep(2000);
  }

  getCollectorAlbumRows() {
    return element.all(by.css('.c-detail table tbody tr'));
  }

  clickOnButton(element: any) {
    element.element(by.css('button')).click();
  }
}
