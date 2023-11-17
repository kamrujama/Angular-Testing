import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  // pure: false // use only when you want watch changes and update the same
})
export class FilterPipe implements PipeTransform {

  transform(value:any, filterString:string): Array<any> {
    if (value.length === 0 || filterString === '')
     return value;

     let users = []

     for(let user of value ) {
       if (user.name.toLowerCase() === filterString.toLowerCase()) {
         users.push(user);
       }
     }

     return users;
  }

}
