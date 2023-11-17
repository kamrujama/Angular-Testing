import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe | Isolated Unit Test', () => {
  it('create an instance', () => {
    const pipe = new StrengthPipe();
    expect(pipe).toBeTruthy();
  });

  it("should return weak for 5 to 10", () => {
    const pipe = new StrengthPipe();
    expect(pipe.transform(5)).toBe("Weak");
  })

  it("should return Strong for 10 to 20", () => {
    const pipe = new StrengthPipe();
    expect(pipe.transform(13)).toBe("Strong");
  })

  it("should return Very Strong for above 20 ", () => {
    const pipe = new StrengthPipe();
    expect(pipe.transform(21)).toBe("Very Strong");
  })

});
