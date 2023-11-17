import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-r-forms',
  templateUrl: './r-forms.component.html',
  styleUrls: ['./r-forms.component.scss']
})
export class RFormsComponent {

  @ViewChild('f') formObject:NgForm | undefined;

  constructor() {}
  ngOninit() {

  }

  checkData() {
    console.log(this.formObject);
  }

  onSubmit() {
    console.log(this.formObject);
  }
}
