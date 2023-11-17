import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  message:string[] = []

  constructor() {
    debugger;
  }

  log(message:string) {
    debugger;
    this.message.push(message);
  }

  clear():void {
    this.message = [];
  }
}
