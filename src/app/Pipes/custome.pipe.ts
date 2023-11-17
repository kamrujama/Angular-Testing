import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenString'
})
export class CustomePipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 5)
      return value.substring(0,4) + '...';

    return value;
  }

}
