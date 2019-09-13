import {Component, OnInit} from '@angular/core';
import {VehicleService} from '../vehicle.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NzNotificationModule} from 'ng-zorro-antd';

@Component({
  selector: 'app-vehicle-category-form',
  templateUrl: './vehicle-category-form.component.html',
  styleUrls: ['./vehicle-category-form.component.less']
})
export class VehicleCategoryFormComponent implements OnInit {
  form: FormGroup;
  isPost: false;

  constructor(
    private vehicleService: VehicleService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group(vehicleService.formControlVehicleCategory);
  }

  ngOnInit() {
  }


  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.vehicleService.createVehicleCategory(this.form.value)
      .subscribe(
        {
          next: val => {
            console.log(val);
          },
          error: err => {
            console.log(err);
          }
        }
      );
  }
}
