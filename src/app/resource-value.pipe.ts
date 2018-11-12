import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import schemas from './models/schemas';
import { formatDate, formatNumber } from '@angular/common';

@Pipe({
  name: 'resourceValue'
})
export class ResourceValuePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) { }

  transform(value: any, objId: number | string, resourceId: number | string): any {
    const resource = schemas[objId] && schemas[objId][resourceId];
    if (!resource) {
      return value;
    }

    const isArray = Array.isArray(resource.type);
    const type = isArray ? resource.type[0] : resource.type;

    const formatter = this.typeFormatter(type);

    return Array.isArray(value) ? value.map((v, i) => `${i} = ${formatter(v)}`).join(', ') : formatter(value);
  }

  typeFormatter(type: string) {
    switch (type) {
      case 'Float':
      case 'Integer':
        return (value) => formatNumber(value, this.locale);
      case 'Time':
        return (value) => formatDate(value * 1000 || value, 'yyyy-MM-dd HH:mm:ss', this.locale);
      default:
        return String;
    }
  }
}
