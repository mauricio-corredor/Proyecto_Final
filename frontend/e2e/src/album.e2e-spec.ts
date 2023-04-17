import { AlbumPage } from './album.po';
import { browser, by, element, logging } from 'protractor';
import * as faker from 'faker';
import { Genre } from '../../src/models/genre.enum';
import { RecordLabel } from '../../src/models/recordLabel.enum';

describe('Album module tests', () => {
  let page: AlbumPage;
  let genres: Genre[] = [
    Genre.Classical,
    Genre.Folk,
    Genre.Rock,
    Genre.Salsa
  ];
  let labels: RecordLabel[] = [
    RecordLabel.DiscosFuentes,
    RecordLabel.EMI,
    RecordLabel.Elektra,
    RecordLabel.FaniaRecords,
    RecordLabel.SonyMusic
  ]

  beforeEach(() => {
    page = new AlbumPage();
    page.navigateTo();
  });

  it('should display a list of albums', () => {
    expect(page.getAlbumsList().count()).toBeGreaterThanOrEqual(4);
  });

  it('should show detail of a particular album', () => {
    page.getFirstAlbumElement().click();
    expect(element(by.id('album-detail'))).toBeTruthy();
  });

  it('should add track to first album', () => {
    let name = faker.name.findName();
    page.getFirstAlbumElement().click();
    page.addTrackToAlbum(name, "2:25");
    expect(element.all(by.css('li.list-group-item .track-name')).last().getText()).toBe(name);
  });

  it('should create album', () => {
    let name = faker.name.findName();
    page.addAlbum(name,"Queen", faker.image.cats(240, 240),
    faker.lorem.paragraph(), faker.date.past(10), faker.random.arrayElement(genres),
    faker.random.arrayElement(labels));
    browser.sleep(2000);
    expect(element(by.css('h1.text-left')).getText()).toBe(name);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
