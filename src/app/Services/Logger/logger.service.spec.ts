import { TestBed } from "@angular/core/testing";
import { LoggerService } from "./logger.service"

describe("Logger Service", () => {
  // arrange
  let logger:LoggerService;

  // act
  beforeEach(() => {
    logger = new LoggerService();
  })

  // const count = logger.message.length;

  // assert
  it("should not have any message at starting", () => {
    // let logger = new LoggerService();
    expect(logger.message.length).toEqual(0);
  })

  it("should add message when log is called", () => {
    // arrange
    // let logger = new LoggerService();

    // act
    logger.log("Hello Message");
    const count = logger.message.length;

    // assert
    expect(count).toBe(1);
  })

  it("should clear message when clear is called", () => {
    // let logger = new LoggerService();
    logger.log("Hello Message");
    logger.clear();
    expect(logger.message.length).toBe(0);
  })

})

describe("Logger Service with TestBed", () => {
  let logger: LoggerService;

  beforeEach(() => {
    // since services will have only instance no template, we directly use it in providers
    TestBed.configureTestingModule({
      providers: [LoggerService]
    })

    // for getting instance of LoggerService
    logger = TestBed.inject(LoggerService);
  })

  it("should add message when log is called", () => {
    // console.log("Message Before Log: ", logger.message)
    logger.log("Message appended in Logger");
    // console.log("Message After Log: ", logger.message)
    expect(logger.message.length).toEqual(1);
  })
})
