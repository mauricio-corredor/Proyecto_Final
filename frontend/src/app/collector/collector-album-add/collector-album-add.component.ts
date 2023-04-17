import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { AlbumService } from 'src/app/album/album.service';
import { Album } from 'src/models/album';
import { Collector } from 'src/models/collector';
import { CollectorService } from '../collector.service';

@Component({
  selector: 'app-collector-album-add',
  templateUrl: './collector-album-add.component.html',
  styleUrls: ['./collector-album-add.component.css']
})
export class CollectorAlbumAddComponent implements OnInit {
  collectorAlbumForm: FormGroup;
  collectors: Array<Collector>;
  albums: Array<Album>;
  Status: string[] = ['Active', 'Inactive'];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private collectorService: CollectorService,
    private albumService: AlbumService,
    private router: Router
  ) { }

  ngOnInit() {
    this.collectorAlbumForm = this.formBuilder.group({
      collector: ["", Validators.required],
      album: ["", Validators.required],
      price: ["", [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      status: ["", Validators.required]
    });
    this.getCollectorsList();
    this.getAlbumList();
  }

  get status() {
    return this.collectorAlbumForm.get('status');
  }

  get collector() {
    return this.collectorAlbumForm.get('collector');
  }

  get album() {
    return this.collectorAlbumForm.get('album');
  }

  getCollectorsList() {
    this.collectorService.getCollectors().subscribe(cl => {
      this.collectors = cl.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  getAlbumList() {
    this.albumService.getAlbums().subscribe(albums => {
      this.albums = albums.sort((a, b) => (a.name < b.name ? -1 : 1));
   });
  }

  addAlbumToCollector(formData: object) {
    console.log(formData);
    this.collectorService.createCollectorAlbum(formData).subscribe(ca => {
      this.showSuccess(ca.album);
    });
    this.collectorAlbumForm.reset();
  }

  showSuccess(a: Album) {
    this.toastr.success($localize`'Album added to collector!`);
  }

  changeStatus(e) {
    this.status.setValue(e.target.value, { onlySelf: true })
  }

  changeCollector(e) {
    this.collector.setValue(e.target.value, { onlySelf: true })
  }

  changeAlbum(e) {
    this.album.setValue(e.target.value, { onlySelf: true })
  }

  cancelCreation() {
    this.collectorAlbumForm.reset();
    this.router.navigate(['/collectors'])
  }
}
