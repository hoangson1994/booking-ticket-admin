import {Injectable} from '@angular/core';
import {IVehicleCategory} from '../../interfaces/vehicle-category.interface';
import {IVehicle} from '../../interfaces/vehicle.interface';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../../interfaces/user.interface';
import {API_URL} from '../../resources/static.resource';
import {finalize, map} from 'rxjs/operators';
import {HelperService} from '../../shared/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  vehicleCategory: IVehicleCategory;
  ivehicle: IVehicle;

  formControlVehicleCategory = {
    name: [null, [Validators.required]],
    seatQuantity: [null, [Validators.required]],
    price: [null, [Validators.required]]
  };

  formControlVehicle = {
    vehicle_name: [null, [Validators.required]],
    plate: [null, [Validators.required]],
    color: [null, [Validators.required]],
    vehicle_category_id: [null, [Validators.required]],
  };


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private helps: HelperService
  ) {
  }

  createVehicleCategory(value): Observable<IVehicleCategory> {
    return this.http
      .post<{ data: IVehicleCategory }>(`${API_URL}vehicle-categories`, value,
        {
          headers: this.helps.getAuth()
        }).pipe(map(d => d.data));
  }
}
