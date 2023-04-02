import { PerformerPage } from './performer.po';
import { browser, by, element, logging } from 'protractor';
import * as faker from 'faker';


describe('workspace-project App', () => {
  let page: PerformerPage;

  beforeEach(() => {
    page = new PerformerPage();
    page.navigateTo();
  });

  it('should display a performers list', () => {
    expect(page.getPerformersList().count()).toBeGreaterThanOrEqual(2);
  });

  it('should detail a performer', () => {
    page.getFirstPerformerElement().click();
    expect(element(by.id('performer-list-detail'))).toBeTruthy();
  });

  it('should create a performer', () => {
    let name = faker.name.findName();
    page.addPerformer(name, faker.image.cats(240, 240),
    faker.date.past(10), faker.lorem.paragraph(5));
    browser.sleep(2000);
    expect(element(by.cssContainingText('.p-3.align-middle', name))).toBeTruthy();

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
