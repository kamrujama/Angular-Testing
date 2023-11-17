import { HttpClient } from "@angular/common/http";
import { PostService } from "./post.service";
import { of } from "rxjs";
import { jsDocComment } from "@angular/compiler";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Post } from "src/app/models/post";

describe("Post Service with native Http", () => {
  let postService: PostService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let POSTS = [
    {
      id: 1,
      title: 'Post 1',
      body: 'Body 1'
    },
    {
      id: 2,
      title: 'Post 2',
      body: 'Body 2'
    },
    {
      id: 3,
      title: 'Post 3',
      body: 'Body 3'
    },
    {
      id: 4,
      title: 'Post 4',
      body: 'Body 4'
    }
  ];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get", "delete"]);
    postService = new PostService(httpClientSpy);
  })

  describe("getPosts()", () => {
    it("should get posts after calling getPosts()", (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(POSTS));
      postService.getPosts().subscribe({
        next: posts => {
          expect(posts).toEqual(POSTS);
          done();
        },
        error: done.fail
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    })
  })

  describe("deletePost()", () => {
    it("Should delete the selected post after calling deletePost()", () => {
      httpClientSpy.delete.and.returnValue(of(POSTS));
      postService.deletePost(POSTS[0]).subscribe();
      expect(httpClientSpy.delete).toHaveBeenCalledTimes(1);
    })
  })
})

describe("Post Service with TestBed", () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postService: PostService;
  let POSTS = [
    {
      id: 1,
      title: 'Post 1',
      body: 'Body 1'
    },
    {
      id: 2,
      title: 'Post 2',
      body: 'Body 2'
    }];

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj("HttpClient", ["get"]);
    TestBed.configureTestingModule({
      providers: [
        PostService, {
          provide: HttpClient,
          useValue: httpClientSpyObj
        }
      ]
    })

    postService = TestBed.inject(PostService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  })

  it("Should get posts after calling getPosts()", (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(POSTS));
    postService.getPosts().subscribe({
      next: posts => {
        expect(posts).toEqual(POSTS);
        done();
      },
      error: done.fail
    })
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  })
})

describe("HttpClientTestingModule", () => {
  let httpClientController: HttpTestingController;
  let postService: PostService;
  let POSTS:Post[] = [
    {
      id: 1,
      title: 'Post 1',
      body: 'Body 1'
    },
    {
      id: 2,
      title: 'Post 2',
      body: 'Body 2'
    }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PostService
      ]
    })

    postService = TestBed.inject(PostService);
    httpClientController = TestBed.inject(HttpTestingController);
  })

  it("getPosts() using Http Client Testing Module", (done: DoneFn) => {
    postService.getPosts().subscribe({
      next: posts => {
        expect(posts).toEqual(POSTS);
        done();
      },
      error: done.fail
    })

    const req = httpClientController.match('https://jsonplaceholder.typicode.com/posts');
    req[0].flush(POSTS);
    expect(req[0].request.method).toEqual("GET");
  })

  it("getPost() method for each post", (done: DoneFn) => {
    postService.getPost(1).subscribe(data => {
      expect(data).toEqual(POSTS[0]);
      done();
    })

    // postService.getPost(2).subscribe(data => {
    //   expect(data).toEqual(POSTS[0]);
    //   done();
    // })

    // postService.deletePost(POSTS[0]).subscribe();

    const req = httpClientController.expectOne(`https://jsonplaceholder.typicode.com/posts/${1}`);
    req.flush(POSTS[0]);
    expect(req.request.method).toBe("GET");
    httpClientController.verify();
  })


})

