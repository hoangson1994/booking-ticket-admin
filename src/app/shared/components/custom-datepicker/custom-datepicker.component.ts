import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';
import {HelperService} from '../../services/helper.service';

@Component({
  selector: 'app-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.less']
})
export class CustomDatepickerComponent implements OnInit {
  @Input()
  dateControl: AbstractControl;
  @Input()
  dateInput: any;

  date: any;

  constructor(
    private helper: HelperService,
  ) {
  }

  ngOnInit() {
  }

  onChange(ev: any) {
    let value = ev;
    if (ev) {
      value = moment(ev).valueOf();
    }
    this.helper.updateAFormField(this.dateControl, value);
  }
}
