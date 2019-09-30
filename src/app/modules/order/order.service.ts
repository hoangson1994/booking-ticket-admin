import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HelperService} from '../../shared/services/helper.service';
import {Observable} from 'rxjs';
import {IScheduleTemplate} from '../../interfaces/schedule-template.interface';
import {ScheduleTemplatesService} from '../schedule-templates/schedule-templates.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private helper: HelperService,
  ) {
  }

}
