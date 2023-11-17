import { Post } from "src/app/models/post"
import { PostsComponent } from "./posts.component";
import { of } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { PostService } from "src/app/Services/Post/post.service";
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { PostDetailsComponent } from "../post-details/post-details.component";

// mocking child component with input decorator
// @Component({
//   selector: 'app-post-details',
//   template: '<div></div>',
// })

// class FakePostDetailsComponent {
//   @Input() post!: Post;
// }
//  mocking child ends


describe('PostsComponent', () => {
  // arrange
  let POSTS: Post[] = [];
  let component: PostsComponent;
  let mockService: any;
  let fixture: any;

  beforeEach(() => {
    POSTS = [
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

    // since it depends on other service, we need to make use of spy
    mockService = jasmine.createSpyObj(['getPosts', 'deletePost']);
    // component = new PostsComponent(mockService);

    // instead of using native approach to create instance we can use TestBed
    TestBed.configureTestingModule({
      declarations: [PostsComponent, PostDetailsComponent],
      providers: [
        { provide: PostService, useValue: mockService }
      ],
    })

    // component = TestBed.inject(PostsComponent);
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
  })

  describe("Post Details", () => {

    it("should set Post data directly from Post Service", () => {
      mockService.getPosts.and.returnValue(of(POSTS));
      fixture.detectChanges();
      expect(component.post.length).toEqual(POSTS.length);
    })

    // shallow integeration by mocking child component
    // it("Should create only one post component for each post", () => {
    //   mockService.getPosts.and.returnValue(of(POSTS));
    //   fixture.detectChanges();
    //   const debugElement = fixture.debugElement;
    //   const postElement = debugElement.queryAll(By.css(".post"));
    //   expect(postElement.length).toEqual(POSTS.length);
    // })

    // deep integration testing
    it("should call postComponent exact number of post using deep integeration", () => {
      mockService.getPosts.and.returnValue(of(POSTS));
      fixture.detectChanges();
      const debugElement = fixture.debugElement;
      const postElement = debugElement.queryAll(By.directive(PostDetailsComponent));
      expect(postElement.length).toEqual(POSTS.length);
    })

    it("should send exact post to child component", () => {
      mockService.getPosts.and.returnValue(of(POSTS));
      fixture.detectChanges();
      const debugElement = fixture.debugElement;
      const postElement = debugElement.queryAll(By.directive(PostDetailsComponent));
      // console.log("Post from parent : ", postElement);
      for( let i = 0; i < postElement.length; i++) {
        const postDetailsInstance = postElement[i].componentInstance;
        expect(postDetailsInstance.post.title).toEqual(POSTS[i].title);
      }
    })

  })

  describe('Delete Posts', () => {
    beforeEach(() => {
      mockService.deletePost.and.returnValue(of(true));
      component.post = POSTS;
    })

    it("should call delete post only once", () => {
      component.deletePost(POSTS[0]);
      expect(mockService.deletePost).toHaveBeenCalledTimes(1);
    })

    it("should call delete post and update the POSTS", () => {
      component.deletePost(POSTS[0]);
      expect(component.post.length).toBe(POSTS.length - 1);
    })

    it("Should delete the selected post", () => {
      component.deletePost(POSTS[0]);
      expect(mockService.deletePost).toHaveBeenCalledWith(POSTS[0]);
    })

    it("Should delete the actual selected post from post array", () => {
      component.deletePost(POSTS[0]);

      // for ( let i = 0; i < component.post.length; i++ ) {
      //   expect(component.post[i]).toEqual(POSTS[i]);
      // }

      for (let data of component.post) {
        expect(data).not.toEqual(POSTS[0]);
      }
    })

    it("should call the delete method when button is clicked", () => {
      spyOn(component, 'deletePost');
      mockService.getPosts.and.returnValue(of(POSTS));
      fixture.detectChanges();

      let element = fixture.debugElement.queryAll(By.directive(PostDetailsComponent));
      element[0].query(By.css('button')).triggerEventHandler('click', null);

      expect(component.deletePost).toHaveBeenCalled();
      expect(component.deletePost).toHaveBeenCalledTimes(1);
      expect(component.deletePost).toHaveBeenCalledWith(POSTS[0]);
    })

    it("Should emit data to delete post", () => {
      spyOn(component, 'deletePost');
      mockService.getPosts.and.returnValue(of(POSTS));
      fixture.detectChanges();

      let element = fixture.debugElement.queryAll(By.directive(PostDetailsComponent));
      (element[0].componentInstance as PostDetailsComponent).delete.emit(POSTS[0]);

      expect(component.deletePost).toHaveBeenCalled();
      expect(component.deletePost).toHaveBeenCalledWith(POSTS[0]);
    })
  })

})
