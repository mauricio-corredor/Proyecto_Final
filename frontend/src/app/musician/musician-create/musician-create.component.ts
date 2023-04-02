import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MusicianService } from 'src/app/musician/musician.service';
import { PerformerDetail } from 'src/models/performerDetail';



@Component({
  selector: 'app-musician-create',
  templateUrl: './musician-create.component.html',
  styleUrls: ['./musician-create.component.scss']
})
export class MusicianCreateComponent implements OnInit {

  musicianForm: FormGroup;
  url: string;
  show: boolean;
  musicians: PerformerDetail[];
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(
    private formBuilder: FormBuilder,
    private musicianService: MusicianService,
    private router: Router,
    private toastr: ToastrService

  ) { }

  hideForm() {
    this.router.navigate(['/performers/list']);
  }

  createMusician(newMusician: PerformerDetail) {
    this.musicianService.addMusician(newMusician).subscribe(() => {
      this.toastr.success($localize`Musician created`);
      this.hideForm()
    }, err => {
      this.toastr.error(err, 'Error');
    });
  }

  ngOnInit(): void {
    this.musicianForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      image: ["", [Validators.required, Validators.pattern(this.reg)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      birthDate: ["", [Validators.required, Validators.minLength(8)]],
    });
  }


}
