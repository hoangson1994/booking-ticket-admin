import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HelperService} from '../../shared/services/helper.service';
import {Validators} from '@angular/forms';
import {API_URL} from '../../resources/static.resource';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formOrders = {
    customerName: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required]],
    scheduleId: [null, [Validators.required]],
    paidStatus: [null, [Validators.required]],
    orderDetailRequest: [null, [Validators.required]],
    orderDetail: {
      vehicleCategoryId: [null, [Validators.required]],
      customerTypeId: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      travelFromId: [null, [Validators.required]],
      travelToId: [null, [Validators.required]],
    }
  };

  constructor(
    private http: HttpClient,
    private helper: HelperService,
  ) {

  }

  createOrder(value) {
    return this.http.post(`${API_URL}orders`, value, {headers: this.helper.getAuth()})
      .pipe(map(value1 => value1));
  }

  listOrder() {
    return this.http.get(`${API_URL}orders`, {headers: this.helper.getAuth()})
      .pipe(map(value => value));
  }
}
