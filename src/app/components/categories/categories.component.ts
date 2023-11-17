import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  constructor(private location:Location) { }
  goBack() {
    this.location.back();
  }
}
