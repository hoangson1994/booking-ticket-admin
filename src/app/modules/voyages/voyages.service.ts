import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HelperService} from '../../shared/services/helper.service';
import {API_URL} from '../../resources/static.resource';

@Injectable({
    providedIn: 'root'
})
export class VoyagesService {

    voyagePartFormControl = {
        fromId: [null, [Validators.required]],
        toId: [null, [Validators.required]],
        distance: [null, Validators.required, Validators.min(0)]
    };

    constructor(
        private http: HttpClient,
        private helper: HelperService,
        private fb: FormBuilder
    ) {
    }

    generatedFormControl() {
        return {
            name: [null, [Validators.required]],
            voyagePartRequests: this.fb.array([
                this.addVoyagePartFormGroup()
            ])
        };
    }

    addVoyagePartFormGroup(): FormGroup {
        return this.fb.group(this.voyagePartFormControl);
    }

    async create(value) {
        const data = {
            voyages: value.voyages.map(voyage => voyage.region_id)
        };
        return this.http.post(`${API_URL}/voyages`, data, {headers: this.helper.getAuth()});
    }
}
