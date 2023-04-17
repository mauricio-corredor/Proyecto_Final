import { PrizePage } from './prize.po';
import { browser, by, element, logging } from 'protractor';
import * as faker from 'faker';


describe('workspace-project App', () => {
  let page: PrizePage;

  beforeEach(() => {
    page = new PrizePage();
    page.navigateTo();
  });

  it('should display a prize list', () => {
    expect(page.getPrizeList().count()).toBeGreaterThanOrEqual(2);
  });


  it('should create a prize', () => {
    let name = faker.name.findName();
    let organization = faker.company.companyName();
    let description = faker.lorem.paragraph(5);
    page.addPrize(organization, name,
    description);
    browser.sleep(2000);
    expect(element(by.cssContainingText('.p-3.align-middle', organization))).toBeTruthy();

  });



  it('should expect "invalid" when trying to create a void form', () => {

    element(by.css('.btn.btn-standard.btn-sm')).click();
    let status = 'disabled';
    browser.sleep(2000);
    expect(element(by.cssContainingText('.p-3.align-middle', status))).toBeTruthy();

  });

  it('should expect "name to short" when writing down a 2 letter name', () => {
    let twoletters= page.twoLetterName();
    element(by.css('.btn.btn-standard.btn-sm')).click();
    element(by.id('name')).sendKeys(twoletters);
    browser.sleep(2000);
    expect(element(by.id('#\@\@nameTooShort'))).toBeTruthy();

  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
