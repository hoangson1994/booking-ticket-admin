import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HelperService} from '../../shared/services/helper.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {API_URL} from '../../resources/static.resource';
import {map} from 'rxjs/operators';
import {ISchedule} from '../../interfaces/schedule.interface';
import {ICustomer} from '../../interfaces/customer.interface';
import {ICustomerType} from '../../interfaces/customer-type.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderDetail = {
    vehicleCategoryId: [null, [Validators.required]],
    customerTypeId: [null, [Validators.required]],
    quantity: [null, [Validators.required]],
    travelFromId: [null, [Validators.required]],
    travelToId: [null, [Validators.required]],
  };

  formOrders = {
    customerName: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required]],
    scheduleId: [null, [Validators.required]],
    paidStatus: [null, [Validators.required]],
    orderDetailRequest: [null, [Validators.required]],
  };

  constructor(
    private http: HttpClient,
    private helper: HelperService,
    private fb: FormBuilder
  ) {
  }

  generatedFormControl() {
    return {
      customerName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      scheduleId: [null, [Validators.required]],
      paidStatus: [null, [Validators.required]],
      orderDetailRequest: this.fb.array(
        [this.addOrdeDetailPartFormGroup()]
      ),
    };
  }

  addOrdeDetailPartFormGroup(): FormGroup {
    return this.fb.group(this.orderDetail);
  }

  createOrder(value) {
    return this.http.post(`${API_URL}orders`, value, {headers: this.helper.getAuth()})
      .pipe(map(value1 => value1));
  }

  listOrder() {
    return this.http.get(`${API_URL}orders`, {headers: this.helper.getAuth()})
      .pipe(map(value => value));
  }

  listScheduleSearch(params) {
    return this.http.get<{ datas: ISchedule[] }>(`${API_URL}schedules/search`, {
      headers: this.helper.getAuth(),
      params
    })
      .pipe(map(({datas}) => datas));
  }

  listCustomer() {
    return this.http.get<{ datas: ICustomer[] }>(`${API_URL}customers`, {headers: this.helper.getAuth()})
      .pipe(map(({datas}) => datas));
  }

  listCustomerType() {
    return this.http.get<{ datas: ICustomerType[] }>(`${API_URL}customer-types`, {headers: this.helper.getAuth()})
      .pipe(map(({datas}) => datas));
  }
}
