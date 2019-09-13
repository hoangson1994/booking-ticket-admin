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
        distance: [null, [Validators.required, Validators.min(0)]]
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

    create(value) {
        return this.http.post(`${API_URL}voyages`, value, {headers: this.helper.getAuth()});
    }
}
