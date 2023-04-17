import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Track } from 'src/models/track';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-track-create',
  templateUrl: './track-create.component.html',
  styleUrls: ['./track-create.component.css']
})
export class TrackCreateComponent implements OnInit {
  trackForm: FormGroup;

  @Input() openForm: boolean;
  @Input() albumId: number;
  @Input() tracks: Track[];
  @Output() reloadTracks = new EventEmitter();
  @Output() showTrackForm = new EventEmitter();

  constructor(private albumService: AlbumService,
    private formBuilder: FormBuilder,
    private toast: ToastrService) { }

  createTrack(track: Track) {
    if (this.tracks.map(x=>x.name).includes(track.name)) {
        this.toast.error($localize`This track already exists`, 'Error');
    }
    else {
      this.albumService.addTrack(track, this.albumId).subscribe(()=> {
        this.reloadTracks.emit();
        this.showTrackForm.emit();
        this.toast.success($localize`The track was created successfully`);
      }, err => {
        this.toast.error(err, 'Error');
      });
    }
  }

  ngOnInit(): void {
    this.trackForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      duration: ['', [Validators.required, Validators.pattern(/^([01]?[0-9]):[0-5][0-9]$/)]]
    });
  }

}
