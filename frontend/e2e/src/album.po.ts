import { browser, by, element } from 'protractor';

export class AlbumPage {
  navigateTo() {
    return browser.get('/albums');
  }

  getAlbumsList() {
    return element.all(by.css('.album-wrapper'));
  }

  getFirstAlbumElement() {
    return element.all(by.css('.album-wrapper')).first();
  }

  addTrackToAlbum(name: string, duration: string) : void {
    element(by.css('.add-track')).click();
    element(by.css('input[aria-label="Name"]')).sendKeys(name);
    element(by.css('input[aria-label="Duration"]')).sendKeys(duration);
    element(by.css('.track-submit')).click();
  }

  addAlbum(name: string, artist: string, cover: string, description: string,
    releaseDate: Date, genre: string, label: string) : void {
    element(by.css('button.btn.btn-standard')).click();
    element(by.css('input[aria-describedby="album-name"]')).sendKeys(name);
    element(by.id('artist-select')).sendKeys(artist);
    element(by.css('input[aria-describedby="album-cover"]')).sendKeys(cover);
    element(by.tagName('textarea')).sendKeys(description);
    element(by.id('genre-select')).sendKeys(genre);
    element(by.id('label-select')).sendKeys(label);
    element(by.id('album-date')).sendKeys(releaseDate.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }));
    element(by.css('.create-album-button')).click();
  }
}
