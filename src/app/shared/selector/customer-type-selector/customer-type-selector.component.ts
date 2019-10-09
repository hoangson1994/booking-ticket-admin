import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {IUser} from '../../../interfaces/user.interface';
import {ICustomerType} from '../../../interfaces/customer-type.interface';
import {HelperService} from '../../services/helper.service';
import {OrderService} from '../../../modules/order/order.service';

@Component({
  selector: 'app-customer-type-selector',
  templateUrl: './customer-type-selector.component.html',
  styleUrls: ['./customer-type-selector.component.less'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomerTypeSelectorComponent),
    multi: true
  }]
})
export class CustomerTypeSelectorComponent implements OnInit {
  @Input()
  mode: string;

  datas: ICustomerType[];
  private propagateChange: (_: any) => void;
  //tslint:disable
  private _model;
  get model() {
    return this._model;
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
    private helper: HelperService,
    private service: OrderService
  ) {
  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.service.listCustomerType().subscribe({
      next: value => this.datas = value,
      error: err => this.helper.handleError(err)
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
