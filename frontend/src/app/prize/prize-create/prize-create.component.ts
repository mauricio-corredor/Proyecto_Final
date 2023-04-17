import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrizeService } from 'src/app/prize/prize.service';
import { PerformerDetail } from 'src/models/performerDetail';
import { Prize } from 'src/models/prize';



@Component({
  selector: 'app-prize-create',
  templateUrl: './prize-create.component.html',
  styleUrls: ['./prize-create.component.scss']
})
export class PrizeCreateComponent implements OnInit {

  prizeForm: FormGroup;
  url: string;
  show: boolean;


  constructor(
    private formBuilder: FormBuilder,
    private prizeService: PrizeService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  hideForm() {
    this.router.navigate(['/prizes/list']);
  }

  createPrize(newPrize: Prize) {
    this.prizeService.addPrize(newPrize).subscribe(() => {
      this.toastr.success($localize`Prize created`);
      this.hideForm()
    }, err => {
      this.toastr.error(err, 'Error');
    });
  }


  ngOnInit(): void {
    this.prizeForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      organization: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
    });
  }


}
