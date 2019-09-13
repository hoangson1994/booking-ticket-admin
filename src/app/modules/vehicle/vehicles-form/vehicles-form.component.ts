import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {VehicleService} from '../vehicle.service';
import {finalize} from 'rxjs/operators';
import {HelperService} from '../../../shared/services/helper.service';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-vehicles-form',
  templateUrl: './vehicles-form.component.html',
  styleUrls: ['./vehicles-form.component.less']
})
export class VehiclesFormComponent implements OnInit {
  form: FormGroup;
  isPost = false;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private helps: HelperService,
    private notify: NzNotificationService
  ) {
    this.form = this.fb.group(vehicleService.formControlVehicle);
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.isPost = true;
    this.vehicleService.createVehicle(this.form.value)
      .pipe(
        finalize(() => this.isPost = false)
      )
      .subscribe({
        next: value => {
          this.notify.success('Thành công', 'Thêm xe thành công');
        },
        error: err => {
          this.helps.handleError(err);
        }
      });
  }
}
