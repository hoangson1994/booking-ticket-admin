import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScheduleTemplatesService} from '../schedule-templates.service';
import {HelperService} from '../../../shared/services/helper.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-schedule-template-form',
    templateUrl: './schedule-template-form.component.html',
    styleUrls: ['./schedule-template-form.component.less']
})
export class ScheduleTemplateFormComponent implements OnInit {

    form: FormGroup;
    isSaving = false;

    constructor(
        private fb: FormBuilder,
        private service: ScheduleTemplatesService,
        private helper: HelperService,
        private notify: NzNotificationService
    ) {
        this.form = this.fb.group(this.service.formControls);
    }

    ngOnInit() {
    }

    submit() {
        this.helper.setDirtyAForm(this.form);
        if (this.form.invalid) {
            return;
        }
        console.log(this.form.value);
        this.isSaving = true;
        this.service.create(this.form.value)
            .pipe(finalize(() => this.isSaving = false))
            .subscribe({
                next: value => {
                    this.notify.success('Thành công', 'Thêm mẫu lịch thành công');
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });

    }
}
