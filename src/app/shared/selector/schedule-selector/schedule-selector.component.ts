import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ISchedule} from '../../../interfaces/schedule.interface';
import {ScheduleService} from '../../../modules/schedules/schedule.service';
import {HelperService} from '../../services/helper.service';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule-selector',
  templateUrl: './schedule-selector.component.html',
  styleUrls: ['./schedule-selector.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScheduleSelectorComponent),
      multi: true
    }
  ]
})
export class ScheduleSelectorComponent implements OnInit {
  @Input()
  mode: string;
  today = moment().startOf('d');
  datas: ISchedule[];
  private propagateChange: (_: any) => void;

  //tslint:disable
  private _model;
  get model() {
    return this._model;
  }

  parseOffsetMlsToTime(offTime: number): string {
    const time = this.today.valueOf() + offTime;
    return moment(time).format('HH:mm');
  }

  set model(value) {
    if (this._model !== value) {
      this._model = value;
      if (this.propagateChange) {
        this.propagateChange(this._model);
      }
    }
  }

  constructor(
    private scheduleService: ScheduleService,
    private helper: HelperService,
  ) {
  }

  ngOnInit() {
    this.listSchedule();
  }

  listSchedule() {
    this.scheduleService.listSchedule()
      .subscribe({
        next: value => {
          this.datas = value;
        },
        error: err => {
          this.helper.handleError(err);
        }
      });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this._model = obj;
  }
}
