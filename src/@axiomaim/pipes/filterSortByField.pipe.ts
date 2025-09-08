import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSortByField',
  standalone: true
})
export class FilterSortByFieldPipe implements PipeTransform {
  transform(array: any, filterField: string, filterValue: any): any[] {
    console.log('filterSort', filterField, filterValue)
    console.log('array:before', array)
    const res = array.find((item: any) => item[filterField] == filterValue);
    console.log('array:after', res)
    // if (!Array.isArray(array)) {
    //   return;
    // }
    // array.sort((a: any, b: any) => {
    //   if (a[sortField] < b[sortField]) {
    //     return -1;
    //   } else if (a[sortField] > b[sortField]) {
    //     return 1;
    //   } else {
    //     return 0;
    //   }
    // });

    return array;
  }
}
