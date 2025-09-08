import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'sortByIndex',
//   pure: false,
//   standalone: true,
// })
// export class SortByIndexPipe implements PipeTransform {
//   transform(value: any[], args?: string): any {
//     const sortedValues = value.sort((a, b) => a[args] - b[args]);
//     return sortedValues;
//   }
// }

@Pipe({
  name: 'sortByIndex',
  pure: false,
  standalone: true,

})
export class SortByIndexPipe implements PipeTransform {

  transform<T>(array: Array<T>, field: string, order: 'asc' | 'desc' = 'asc'): Array<T> {
    if (!array || !field) {
      return array;
    }

    return array.sort((a: any, b: any) => {
      const aValue = a[field];
      const bValue = b[field];

      if (order === 'asc') {
        if (aValue < bValue) {
          return -1;
        } else if (aValue > bValue) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (aValue > bValue) {
          return -1;
        } else if (aValue < bValue) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }
}




