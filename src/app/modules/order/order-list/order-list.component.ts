import {Component, OnInit} from '@angular/core';
import {ScheduleTemplatesService} from '../../schedule-templates/schedule-templates.service';
import {HelperService} from '../../../shared/services/helper.service';
import {IScheduleTemplate} from '../../../interfaces/schedule-template.interface';
import * as moment from 'moment';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.less']
})
export class OrderListComponent implements OnInit {

  datas: IScheduleTemplate[];
  loading = true;

  constructor(
    private scheduleTemService: ScheduleTemplatesService,
    private helper: HelperService,
  ) {
  }

  ngOnInit() {
    this.list();
  }

  parseOffsetMlsToTime(offTime: number): string {

    return moment(offTime).format('HH:mm');
  }

  list() {
    this.scheduleTemService.list()
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        {
          next: value => {
            this.datas = value;
            console.log(this.datas);
          },
          error: err => {
            this.helper.handleError(err);
          }
        }
      );
  }
}
