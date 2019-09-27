import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {IVoyage} from '../../../interfaces/voyage.interface';
import {VoyagesService} from '../../../modules/voyages/voyages.service';
import {HelperService} from '../../services/helper.service';

@Component({
    selector: 'app-voyage-selector',
    templateUrl: './voyage-selector.component.html',
    styleUrls: ['./voyage-selector.component.less'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => VoyageSelectorComponent),
            multi: true
        }
    ]
})
export class VoyageSelectorComponent implements OnInit {
    @Input()
    mode: string;

    data: IVoyage[];
    private propagateChange: (_: any) => void;
    //tslint:disable
    private _model;
    get model() {
        return this._model;
    }

    set model(value) {
        if (this._model !== value) {
            this._model = value;
            if (this.propagateChange) {
                this.propagateChange(this._model);
            }
        }
    }

    constructor(
        private service: VoyagesService,
        private helper: HelperService,
    ) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.service
            .list()
            .subscribe({
                next: value => {
                    this.data = value;
                },
                error: err => this.helper.handleError(err)
            });
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
        this._model = obj;
    }


}
