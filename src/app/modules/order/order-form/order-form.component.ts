import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {ISchedule} from 'src/app/interfaces/schedule.interface';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.less']
})
export class OrderFormComponent implements OnInit {
  datasSchedule: ISchedule[];
  tabs = [
    {
      id: 1,
      name: 'Lịch'
    }
  ];
  params = {};

  @Input()
  close;
  @Input()
  date: string;
  @Input()
  voyageId: number;
  @Input()
  scheduleTemplateId: number;
  isLoding: boolean;

  constructor(
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.isLoding = true;
    if (this.date && this.voyageId && this.scheduleTemplateId) {
      this.params = {
        date: this.date,
        voyageId: this.voyageId,
        scheduleTemplateId: this.scheduleTemplateId
      };

      this.orderService.listScheduleSearch(this.params)
        .pipe(finalize(() => this.isLoding = false))
        .subscribe(
          value => {
            this.datasSchedule = value;
          },
          error => {
            console.log(error);
          }
        );
    }
  }
}
