import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByField',
  standalone: true
})
export class SortByFieldPipe implements PipeTransform {
  // transform(value: any[], key?: any): any {
  //   const sortedValues = value.sort((a, b) => a[key] - b[key]);
  //   return sortedValues;
  // }
  transform(array: any, field: string): any[] {
    if (!Array.isArray(array)) {
      return;
    }
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
