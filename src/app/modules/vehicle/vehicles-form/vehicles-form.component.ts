import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {VehicleService} from '../vehicle.service';

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
    private vehicleService: VehicleService
  ) {
    this.form = this.fb.group(vehicleService.formControlVehicle);
  }

  ngOnInit() {
  }

}
