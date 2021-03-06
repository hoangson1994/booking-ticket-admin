import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../schedule.service';
import {ISchedule, ScheduleStatus} from '../../../interfaces/schedule.interface';
import {finalize} from 'rxjs/operators';
import {HelperService} from '../../../shared/services/helper.service';
import * as moment from 'moment';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.less']
})
export class ScheduleListComponent implements OnInit {
  datas: ISchedule[];
  isLoading: boolean;
  today = moment().startOf('d');
  scheduleStatus = ScheduleStatus;

  constructor(
    private scheduleService: ScheduleService,
    private helper: HelperService,
    private notify: NzNotificationService
  ) {
  }

  ngOnInit() {
    this.list();
  }

  parseOffsetMlsToTime(offTime: number): string {
    const time = this.today.valueOf() + offTime;
    return moment(time).format('HH:mm YYYY-MM-DD');
  }

  list() {
    this.isLoading = true;
    this.scheduleService.listSchedule()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: value => {
          this.datas = value;
        },
        error: err => {
          this.helper.handleError(err);
        }
      });
  }

  deleteSchedule(index: number) {
    const selected = this.datas[index];
    selected.isDeleting = true;
    this.scheduleService.deleteSchedule(selected.id)
      .subscribe({
        next: value => {
          this.datas.splice(index, 1);
          this.notify.success('Thành công', 'Xóa nhân viên thành công');
        },
        error: err => {
          this.helper.handleError(err);
        }
      });
  }
}
