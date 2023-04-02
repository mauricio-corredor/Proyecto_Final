import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import * as faker from 'faker';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { Producto } from 'src/models/producto';
import { Genre } from 'src/models/genre.enum';
import { Performer } from 'src/models/performer';
import { RecordLabel } from 'src/models/recordLabel.enum';
import { ProductoCreateComponent } from '../producto-create/producto-create.component';
import { ProductoDetailComponent } from '../producto-detail/producto-detail.component';

import { ProductoListComponent } from './producto-list.component';

describe('ProductosComponent', () => {
  let component: ProductoListComponent;
  let fixture: ComponentFixture<ProductoListComponent>;
  let debug: DebugElement;
  const genres: Genre[] = [
    Genre.Classical,
    Genre.Folk,
    Genre.Rock,
    Genre.Salsa
  ];
  const labels: RecordLabel[] = [
    RecordLabel.DiscosFuentes,
    RecordLabel.EMI,
    RecordLabel.Elektra,
    RecordLabel.FaniaRecords,
    RecordLabel.SonyMusic
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'productos/:id', component: ProductoDetailComponent }
        ]),
        ToastNoAnimationModule.forRoot()],
      declarations: [ ProductoListComponent, ProductoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoListComponent);
    component = fixture.componentInstance;
    component.productos = [];
    component.filteredProductos = [];
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should not display filtered-productos but no-producto div, when array is empty', () => {
    expect(debug.query(By.css('.filtered-productos'))).toBeNull();
    expect(debug.query(By.css('.no-productos'))).toBeTruthy();
  });


  it('should display only productos by selected artist', () => {
    let fakeArtist = "Fake Artist";
    for (let i = 0; i < 3; i++) {
      component.productos.push(new Producto(i, faker.lorem.slug(), faker.image.cats(250, 230),
      faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), faker.random.arrayElement(labels), [],
      [new Performer(faker.datatype.number(),fakeArtist, faker.datatype.datetime(), faker.datatype.datetime())], []));
    }
    for (let i = 0; i < 5; i++) {
      component.productos.push(new Producto(i, faker.lorem.slug(), faker.image.cats(250, 230), faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), faker.random.arrayElement(labels), [],
      [new Performer(faker.datatype.number(),faker.name.firstName(), faker.datatype.datetime(), faker.datatype.datetime())], []));
    }
    for (let i = 0; i < 5; i++) {
      component.productos.push(new Producto(i, faker.lorem.slug(), faker.image.cats(250, 230), faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), faker.random.arrayElement(labels), [], [], []));
    }
    component.filterValues.artist = fakeArtist;
    component.filteredProductos = component.performFilters();
    fixture.detectChanges();
    expect(debug.query(By.css('.filtered-productos')).children.length).toBe(3);
  });


  it('should display only productos by selected genre', () => {
    for (let i = 0; i < 5; i++) {
      component.productos.push(new Producto(i, faker.lorem.slug(), faker.image.cats(250, 230),
      faker.date.past(), faker.lorem.paragraph(),
      Genre.Classical, faker.random.arrayElement(labels), [], [], []));
    }
    for (let i = 0; i < 5; i++) {
      component.productos.push(new Producto(i, faker.lorem.slug(), faker.image.cats(250, 230),
      faker.date.past(), faker.lorem.paragraph(),
      Genre.Folk, faker.random.arrayElement(labels), [], [], []));
    }
    component.filterValues.genre = Genre.Classical;
    component.filteredProductos = component.performFilters();
    fixture.detectChanges();
    expect(debug.query(By.css('.filtered-productos')).children.length).toBe(5);
  });


  it('should display only productos by selected record label', () => {
    for (let i = 0; i < 10; i++) {
      component.productos.push(new Producto(i, faker.lorem.slug(), faker.image.cats(250, 230),
      faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), RecordLabel.DiscosFuentes, [], [], []));
    }
    for (let i = 0; i < 5; i++) {
      component.productos.push(new Producto(i, faker.lorem.slug(), faker.image.cats(250, 230),
      faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), RecordLabel.SonyMusic, [], [], []));
    }
    component.filterValues.label = RecordLabel.DiscosFuentes;
    component.filteredProductos = component.performFilters();
    fixture.detectChanges();
    expect(debug.query(By.css('.filtered-productos')).children.length).toBe(10);
  });


  it('should display all productos when no filter is applied', () => {
    for (let i = 0; i < 10; i++) {
      component.productos.push(new Producto(i, faker.lorem.slug(), faker.image.cats(250, 230),
      faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), faker.random.arrayElement(labels), [],
      [new Performer(faker.datatype.number(),faker.name.findName(), faker.datatype.datetime(), faker.datatype.datetime())], []));
    }
    component.filterValues.artist = '';
    component.filterValues.genre = '';
    component.filterValues.label = '';
    component.filteredProductos = component.performFilters();

    fixture.detectChanges();
    expect(debug.query(By.css('.filtered-productos')).children.length).toBe(10);
  });

  it('select producto', () => {
    fixture.ngZone.run(() => {
      component.onSelected(101);
    });
    fixture.detectChanges();
    expect(debug.query(By.css('.container-fluid'))).toBeTruthy();
  })

  it('set filters', () => {
    component.genreFilter = faker.random.arrayElement(genres);
    component.labelFilter = faker.random.arrayElement(labels);
    component.artistFilter = "Queen";
    fixture.detectChanges();
    expect(debug.query(By.css('.filtered-productos'))).toBeNull();
  })

  it('show new producto form', () => {
    component.showForm();
    fixture.detectChanges();
    expect(debug.query(By.css('.producto-form'))).toBeTruthy();
  })

  it('hide new producto form', () => {
    component.hideForm();
    fixture.detectChanges();
    expect(debug.query(By.css('.producto-form'))).toBeNull();
  })
});
