import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByHierarchId',
  standalone: true
})
export class SortByHierarchIdPipe implements PipeTransform {
  transform(array: any): any {
    return [...array].sort((a, b) => {
      const aLevels = a.hierarchId.split('.').map(Number);
      const bLevels = b.hierarchId.split('.').map(Number);

      const maxLength = Math.max(aLevels.length, bLevels.length);

      for (let i = 0; i < maxLength; i++) {
        const aNum = aLevels[i] || 0;
        const bNum = bLevels[i] || 0;

        if (aNum!== bNum) {
          return aNum - bNum; // Numerical comparison
        }
      }

      return 0; // All levels are equal
    });
  }
}