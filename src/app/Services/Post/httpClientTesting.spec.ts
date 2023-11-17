import { HttpClient, HttpClientModule } from "@angular/common/http"
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"

let testUrl = "/data"

interface Data {
  name: string
}

describe("HTTP Client Testing Module", () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  })

  it("Should call the given url", (done: DoneFn) => {
    let testData: Data = {
      name: "Angular"
    }
    // httpClient.get<Data>(testUrl).subscribe();
    // const req = httpTestingController.expectOne(testUrl);
    // expect(req.request.method).toEqual("GET");
    // --------- OR ---------
    httpClient.get<Data>(testUrl).subscribe(data => {
      expect(data.name).toEqual("Angular");
      done();
    });

    const req = httpTestingController.expectOne(testUrl);
    req.flush(testData);
    expect(req.request.method).toEqual("GET");
  })

  it("Should handle multiple http requests", () => {
    const testData: Data[] = [
      { name: "Angular" },
      { name: 'React' }
    ]

    httpClient.get<Data[]>(testUrl).subscribe(data => {
      expect(data.length).toEqual(0);
    });

    httpClient.get<Data[]>(testUrl).subscribe(data => {
      expect(data).toEqual([testData[0]]);
    });

    httpClient.get<Data[]>(testUrl).subscribe(data => {
      expect(data).toEqual(testData);
    });

    let req = httpTestingController.match(testUrl);
    expect(req.length).toEqual(3);

    req[0].flush([]);
    req[1].flush([testData[0]]);
    req[2].flush(testData);

  })

})
