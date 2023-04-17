import { CollectorPage } from './collector.po';
import { browser, by, element, logging } from 'protractor';
import * as faker from 'faker';

describe('Collector module tests', () => {
  let collectors: CollectorPage;

  beforeEach(() => {
    collectors = new CollectorPage();

    collectors.navigateToList();
  });

  it('should display at least two collectors', () => {
    expect(collectors.getCollectorsRows().count())
      .toBeGreaterThanOrEqual(2);
  });

  it('should show details of a collector', () => {
    collectors.goToFirstCollector();

    expect(collectors.getCollectorDetailTableName())
      .toBeTruthy();
  });

  it('should create a new collector', () => {
    let collectorName = faker.name.findName();
    let newCollectorFound = 0;

    collectors.goToAddCollector();

    collectors.createCollector(
      collectorName,
      faker.datatype.number({min: 1000000000, max: 9999999999}),
      faker.internet.email()
    );

    collectors.navigateToList();

    collectors.getCollectorsRows()
      .each(function(element, index) {
        element.getText().then(function (text) {
          if (text.includes(collectorName)) {
            newCollectorFound = 1;
          }
        });
      }).then(() => {
        expect(newCollectorFound)
          .toBe(1);
      });
  });

  it('should associate an album to a collector', () => {
    let price = 50;
    let collectorName = faker.name.findName();

    collectors.goToAddCollector();

    collectors.createCollector(
      collectorName,
      faker.datatype.number({min: 1000000000, max: 9999999999}),
      faker.internet.email()
    );

    collectors.navigateToList();
    collectors.goToAddAlbumToCollector();

    collectors.addAlbumToCollector(collectorName, price);

    collectors.navigateToList();

    collectors.getCollectorsRows()
      .each(function(element, index) {
        element.getText().then(function (text) {
          if (text.includes(collectorName)) {
            collectors.clickOnButton(element);
          }
        });
      })
      .then(() => {
        expect(collectors.getCollectorAlbumRows().count())
          .toBeGreaterThanOrEqual(1);
      });
  });
});
