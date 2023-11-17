import { Component } from '@angular/core';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.scss']
})
export class PipeComponent {
  isLoading:boolean = true;
  promiseData = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Resolved Data')
      this.isLoading = false;
    }, 3000)
  })
  users = [
    {
      'name':'Ansari',
      'joinDate': new Date(1,2,2022)
    },
    {
      'name':'Mahfuz',
      'joinDate': new Date(3,4,2023)
    },
    {
      'name':'Abu Sufiyan',
      'joinDate': new Date(10,2,2021)
    },
    {
      'name':'Abu',
      'joinDate': new Date(11,2,2021)
    }
  ]
  filterName:string = '';
  constructor() {}
  ngOninit() {

  }
}
