import {Component, OnInit} from '@angular/core';
import {IScheduleTemplate} from '../../../interfaces/schedule-template.interface';
import * as moment from 'moment';
import {ScheduleTemplatesService} from '../../schedule-templates/schedule-templates.service';
import {HelperService} from '../../../shared/services/helper.service';
import {finalize} from 'rxjs/operators';
import {OrderFormComponent} from '../order-form/order-form.component';
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.less']
})
export class OrderCreateComponent implements OnInit {

  datas: IScheduleTemplate[];
  loading = true;
  today = moment().startOf('d');


  constructor(
    private scheduleTemService: ScheduleTemplatesService,
    private helper: HelperService,
    private modalService: NzModalService
  ) {
  }

  ngOnInit() {
    this.listSchedule();

  }

  getOffsetTimeMls(offTime: number): number {
    return this.today.valueOf() + offTime;
  }

  parseOffsetMlsToTime(offTime: number): string {
    const time = this.today.valueOf() + offTime;
    return moment(time).format('HH:mm');
  }

  listSchedule() {
    this.scheduleTemService.list()
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        {
          next: value => {
            this.datas = value;
          },
          error: err => {
            this.helper.handleError(err);
          }
        }
      );
  }

  showModal(date, voyageId, scheduleTemplateId) {
    const modal = this.modalService.create({
      nzWidth: 1100,
      nzContent: OrderFormComponent,
      nzFooter: [
        {
          label: 'Đóng',
          onClick: () => {
            modal.destroy();
          }
        }
      ],
      nzComponentParams: {
        //tslint:disable
        close: () => modal.destroy(),
        date: date,
        voyageId: voyageId,
        scheduleTemplateId: scheduleTemplateId
      },
      nzOnCancel: () => modal.destroy(),
      nzMaskClosable: true,
      nzClosable: true,
      nzClassName: 'large-modal',
    });
  }
}
