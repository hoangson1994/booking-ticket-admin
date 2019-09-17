import {Pipe, PipeTransform} from '@angular/core';

export const TRANSLATE_MAPPING = {
    Active: 'Hoạt động',
    Inactive: 'Không hoạt động',
    Deleted: 'Đã xóa',
    Processing: 'Chờ xử lí',
};

@Pipe({
    name: 'translate'
})
export class TranslatePipe implements PipeTransform {

    transform(key: any, args?: any): any {
        return TRANSLATE_MAPPING[key] || key;
    }

}
