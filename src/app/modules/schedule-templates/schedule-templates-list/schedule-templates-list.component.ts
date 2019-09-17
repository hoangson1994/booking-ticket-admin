import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {IScheduleTemplate, ScheduleTemplateStatus} from '../../../interfaces/schedule-template.interface';
import {ERouters} from '../../../resources/static.resource';
import {ScheduleTemplatesService} from '../schedule-templates.service';
import {HelperService} from '../../../shared/services/helper.service';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-schedule-templates-list',
    templateUrl: './schedule-templates-list.component.html',
    styleUrls: ['./schedule-templates-list.component.less']
})
export class ScheduleTemplatesListComponent implements OnInit {
    datas: IScheduleTemplate[];
    isLoading = false;
    today = moment().startOf('d');
    statuses = ScheduleTemplateStatus;
    eRouters = ERouters;

    constructor(
        private service: ScheduleTemplatesService,
        private helper: HelperService
    ) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.isLoading = true;
        this.service.list()
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: value => {
                    this.datas = value;
                },
                error: err => {
                    this.helper.handleError(err);
                }
            });
    }

    parseOffsetMlsToTime(offsetMls: number): string {
        const time = this.today.valueOf() + offsetMls;
        return moment(time).format('HH:mm');
    }

    doDelete(i: number) {
    }
}
