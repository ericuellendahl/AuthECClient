import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstkey'
})
export class FirstkeyPipe implements PipeTransform {

  transform(value: any): string | null {
    if (value && typeof value === 'object') {
      const keys = Object.keys(value);
      if (keys.length > 0) {
        return keys[0];
      }
    }
    return null;
  }

}
