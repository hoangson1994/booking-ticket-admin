import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {ISchedule} from 'src/app/interfaces/schedule.interface';
import {finalize} from 'rxjs/operators';
import {HelperService} from '../../../shared/services/helper.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.less']
})
export class OrderFormComponent implements OnInit {
  datasSchedule: ISchedule[];
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

  constructor(
    private orderService: OrderService,
    private helper: HelperService,
    private form: FormBuilder,
    private router: Router
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
            console.log(error);
          }
        );
    }

    this.orderService.listCustomerType()
      .subscribe({
        next: value => {
          console.log(value);
        }, error: err => {
          this.helper.handleError(err);
        }
      });
  }


  onSubmit() {
    console.log(this.orderForm.value);
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 1 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`
    };

    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.orderForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.orderForm.removeControl(i.controlInstance);
    }
  }

  getFormControl(name: string): AbstractControl {
    return this.orderForm.controls[name];
  }
}
