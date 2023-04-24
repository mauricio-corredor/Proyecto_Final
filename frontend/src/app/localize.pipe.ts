import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localize'
})
export class LocalizePipe implements PipeTransform {
  transform(value: string): string {
    // implement your localization logic here
    return value;
  }
}
