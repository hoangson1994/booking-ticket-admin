import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {ISchedule} from 'src/app/interfaces/schedule.interface';
import {finalize} from 'rxjs/operators';
import {HelperService} from '../../../shared/services/helper.service';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ICustomerType} from '../../../interfaces/customer-type.interface';
import {NzNotificationService} from 'ng-zorro-antd';
import {ERouters} from '../../../resources/static.resource';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.less']
})
export class OrderFormComponent implements OnInit {
  datasSchedule: ISchedule[];
  datasCustomerType: ICustomerType[];
  orderForm: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
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
  isSubmit: boolean;

  constructor(
    private orderService: OrderService,
    private helper: HelperService,
    private form: FormBuilder,
    private router: Router,
    private notify: NzNotificationService
  ) {
  }

  ngOnInit() {
    this.orderForm = this.form.group(this.orderService.generatedFormControl());

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
            this.helper.handleError(error);
          }
        );
    }

    this.orderService.listCustomerType()
      .subscribe({
        next: value => {
          this.datasCustomerType = value;
        }, error: err => {
          this.helper.handleError(err);
        }
      });
  }

  onSubmit() {
    this.helper.setDirtyAForm(this.orderForm);
    if (this.orderForm.invalid) {
      return;
    }
    this.isSubmit = true;

    this.orderService.createOrder(this.orderForm.value)
      .pipe(finalize(() => this.isSubmit = false))
      .subscribe({
        next: value => {
          this.notify.success('Thành công', 'Đặt xe thành công');
          this.router.navigate(['/', ERouters.order, ERouters.list_order]);
        },
        error: err => this.helper.handleError(err)
      });
  }

  addField(e?: MouseEvent): void {
    const formArr = this.orderForm.get('orderDetailRequest') as FormArray;
    formArr.push(this.orderService.addOrdeDetailPartFormGroup());
  }

  removeField(i): void {
    const voyagePartForm = this.orderForm.get('orderDetailRequest') as FormArray;
    if (voyagePartForm.length < 2) {
      return;
    }
    voyagePartForm.removeAt(i);
  }

  getFormControl(name: string): AbstractControl {
    return this.orderForm.controls[name];
  }
}
