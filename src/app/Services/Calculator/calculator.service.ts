import { Injectable } from '@angular/core';
import { LoggerService } from '../Logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private logger:LoggerService) { }

  add(n1:number, n2:number) : number {
    let result = n1 + n2;
    this.logger.log("Addition function called")
    return result;
  }
  subtract(n1:number, n2:number) : number {
    let result = n1 - n2;
    this.logger.log("Subtraction function called")
    return result;
  }
}
