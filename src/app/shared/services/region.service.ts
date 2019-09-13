import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../resources/static.resource';
import {shareReplay} from 'rxjs/operators';
import {IDistrict} from '../../interfaces/district.interface';
import {IStreet} from '../../interfaces/street.interface';
import {IProvince} from '../../interfaces/province.interface';

@Injectable({
  providedIn: 'root'
})
export class RegionService {


  constructor(
      private http: HttpClient
  ) { }

  provinces() {
    return this.http.get<{datas: IProvince[]}>(`${API_URL}region/provinces`)
        .pipe(shareReplay());
  }

  //tslint:disable
  districts(province_id) {
    return this.http.get<{datas: IDistrict[]}>(`${API_URL}region/districts`,
        {
          params: {province_id}
        }
    );
  }

  streets(district_id) {
    return this.http.get<{datas: IStreet[]}>(`${API_URL}region/districts`,
        {
          params: {district_id}
        }
    );
  }
}
