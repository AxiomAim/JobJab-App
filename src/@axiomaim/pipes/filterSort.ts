import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSort',
  pure: false,
  standalone: true,
})
export class FilterByIdPipe implements PipeTransform {
  transform(items: Array<any>, field?: string) {
    return items.find(item => item.id == id);
  }
}