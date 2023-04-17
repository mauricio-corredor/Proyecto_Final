import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MusicianService } from 'src/app/musician/musician.service';
import { Album } from 'src/models/album';
import { Genre } from 'src/models/genre.enum';
import { Performer } from 'src/models/performer';
import { RecordLabel } from 'src/models/recordLabel.enum';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css']
})
export class AlbumCreateComponent implements OnInit {
  albumForm: FormGroup;
  url: string;
  genres: Genre[];
  labels: RecordLabel[];
  show: boolean;
  performers: Performer[];

  @Input() openForm: boolean;
  @Output() cancelForm = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private albumService: AlbumService,
    private performerService: MusicianService,
    private router: Router, private toast: ToastrService) { }

  hideForm() {
    this.cancelForm.emit()
  }

  onTypingUrl() {
    this.url = (<HTMLInputElement>document.getElementById("album-cover")).value;
  }

  clearUrl(_$event: any) {
    (<HTMLInputElement>document.getElementById("album-cover")).value = "";
    this.url = undefined;
  }

  createAlbum(album: Album) {
    let performer = this.albumForm.controls.performers.value;
    this.albumService.addAlbum(album).subscribe(a => {
        this.albumService.addArtistToAlbum(a, performer).subscribe(()=> {
          this.router.navigate(['/albums/' + a.id]);
          this.toast.success($localize`The album was created successfully`);
        })
    }, err => {
      this.toast.error(err, 'Error');
    });
  }

  ngOnInit(): void {
    this.performerService.getMusicians().subscribe((m)=> {
      this.performers = m;
    });
    this.performerService.getBands().subscribe((b) => {
      b.forEach(x=> this.performers?.push(x));
      this.performers?.sort((a,b) => a.name < b.name ? -1 : 1);
    })
    this.genres = [
    Genre.Classical,
    Genre.Folk,
    Genre.Rock,
    Genre.Salsa
    ]
    this.labels = [
    RecordLabel.DiscosFuentes,
    RecordLabel.Elektra,
    RecordLabel.EMI,
    RecordLabel.FaniaRecords,
    RecordLabel.SonyMusic
    ]
    this.albumForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      performers: ['', Validators.required],
      releaseDate: ['', Validators.required],
      cover: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(12)]],
      genre: ['', Validators.required],
      recordLabel: ['', Validators.required]
    });
  }

}
