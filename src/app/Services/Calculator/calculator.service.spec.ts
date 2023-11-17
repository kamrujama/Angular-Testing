import { TestBed } from "@angular/core/testing";
import { LoggerService } from "../Logger/logger.service";
import { CalculatorService } from "./calculator.service";

describe("Service.ts", () => {

  let calculator: CalculatorService;
  let logger: LoggerService;
  let mockLoggerService: LoggerService;

  beforeEach(() => {
    logger = new LoggerService();
    calculator = new CalculatorService(logger);
    // to spy on entire contructor
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
  })

  it("should return sum of two numbers", () => {
    spyOn(logger, "log"); // it will spy only on log method
    let result = calculator.add(1, 2);

    // expect(calculator.add(1, 2)).toBe(3);
    expect(result).toBe(3);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(0);
    expect(logger.log).toHaveBeenCalledTimes(1);
  })

  it("should return subtraction of two numbers", () => {
    spyOn(logger, "log"); // it will spy only on log method
    let result = calculator.subtract(3, 1);

    // expect(calculator.subtract(3, 1)).toBe(2);
    expect(result).toBe(2);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(0);
    expect(logger.log).toHaveBeenCalledTimes(1);
  })

})

describe("Service.ts with TestBed", () => {

  let calculator: CalculatorService;
  let logger: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculatorService, LoggerService]
    })

    calculator = TestBed.inject(CalculatorService);
    logger = TestBed.inject(LoggerService);

  })

  it("should add two numbers", () => {
    let result = calculator.add(1, 2);
    logger.log("Called Add Method");
    // console.log(logger.message);
    expect(result).toBe(3);
  })
})

describe("Mock | Spy Services using TestBed", () => {
  let calculator: CalculatorService;
  let loggerSpy: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    const loggerSpyObject = jasmine.createSpyObj("LoggerService", ["log","clear"]);
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpyObject }
      ]
    })

    calculator = TestBed.inject(CalculatorService);
    loggerSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
  })

  it("should clear the log message", () => {
    loggerSpy.log("Log Message Before Clear");
    loggerSpy.clear();
    expect(loggerSpy.clear).toHaveBeenCalledTimes(1);
  })

  it("Should subtract two numbers and log message", () => {
    let result = calculator.subtract(3, 1);
    loggerSpy.log("Called Subtract Method");
    expect(result).toBe(2);
  })

})
