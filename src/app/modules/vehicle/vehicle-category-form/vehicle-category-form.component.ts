import {Component, OnInit} from '@angular/core';
import {VehicleService} from '../vehicle.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';
import {HelperService} from '../../../shared/services/helper.service';
import {finalize} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vehicle-category-form',
  templateUrl: './vehicle-category-form.component.html',
  styleUrls: ['./vehicle-category-form.component.less']
})
export class VehicleCategoryFormComponent implements OnInit {
  form: FormGroup;
  isPost = false;

  constructor(
    private vehicleService: VehicleService,
    private fb: FormBuilder,
    private notify: NzNotificationService,
    private helps: HelperService,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group(vehicleService.formControlVehicleCategory);
    console.log(this.activatedRoute.params.value.id);
  }

  ngOnInit() {
    // activatedroute
  }


  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.isPost = true;
    this.vehicleService.createVehicleCategory(this.form.value)
      .pipe(finalize(() => this.isPost = false))
      .subscribe(
        {
          next: val => {
            this.notify.success('Thành công', 'Tạo nhóm xe thành công');
          },
          error: err => {
            this.helps.handleError(err);
          }
        }
      );
  }
}
