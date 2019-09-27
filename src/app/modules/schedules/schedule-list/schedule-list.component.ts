import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../schedule.service';
import {ISchedule} from '../../../interfaces/schedule.interface';
import {finalize} from 'rxjs/operators';
import {HelperService} from '../../../shared/services/helper.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.less']
})
export class ScheduleListComponent implements OnInit {
  data: ISchedule[];
  isLoading: boolean;

  constructor(
    private scheduleService: ScheduleService,
    private helper: HelperService
  ) {
  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.isLoading = true;
    this.scheduleService.listSchedule()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: value => {
          this.data = value;
        },
        error: err => {
          this.helper.handleError(err);
        }
      });
  }

}
