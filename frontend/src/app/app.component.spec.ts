import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MusicianComponent } from './musician/musician.component';
import { AlbumListComponent } from './album/album-list/album-list.component';
import { AppComponent } from './app.component';
import { CollectorListComponent } from './collector/collector-list/collector-list.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserTestingModule,
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        NgbModule
      ],
      declarations: [
        AppComponent,
        MusicianComponent,
        AlbumListComponent,
        CollectorListComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'front'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('front');
  });
});
