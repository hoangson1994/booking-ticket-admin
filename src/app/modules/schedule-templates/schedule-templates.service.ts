import {Injectable} from '@angular/core';
import {Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {IScheduleTemplate} from '../../interfaces/schedule-template.interface';
import {API_URL} from '../../resources/static.resource';
import {HelperService} from '../../shared/services/helper.service';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ScheduleTemplatesService {

    formControls = {
        timeStart: [null, [Validators.required]],
        timeEnd: [null, [Validators.required]],
        listVoyageIds: [null, [Validators.required]],
    };

    constructor(
        private http: HttpClient,
        private helper: HelperService
    ) {
    }

    create(value: IScheduleTemplate) {
        return this.http.post(`${API_URL}schedule-templates`, value,
            {
                headers: this.helper.getAuth()
            }
        );
    }

    list() {
        return this.http.get<{datas: IScheduleTemplate[]}>(`${API_URL}schedule-templates`,
            {headers: this.helper.getAuth()}
            )
            .pipe(map(({datas}) => datas));
    }
}
