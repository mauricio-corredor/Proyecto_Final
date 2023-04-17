import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { Collector } from 'src/models/collector';
import { CollectorService } from '../collector.service';

@Component({
  selector: 'app-collector-create',
  templateUrl: './collector-create.component.html',
  styleUrls: ['./collector-create.component.css']
})
export class CollectorCreateComponent implements OnInit {
  collectorForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private collectorService: CollectorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.collectorForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      telephone: ["", [Validators.required, Validators.minLength(7), Validators.pattern(/^[0-9]\d*$/)]],
      email: ["", [Validators.required, Validators.email]]
    });
  }

  createCollector(newCollector: Collector) {
    this.collectorService.createCollector(newCollector).subscribe(collector => {
      this.showSuccess(newCollector);
    });
    this.collectorForm.reset();
  }

  showSuccess(c: Collector) {
    this.toastr.success($localize`Collector created successfully!`);
  }

  cancelCreation() {
    this.collectorForm.reset();
    this.router.navigate(['/collectors'])
  }
}
