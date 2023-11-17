import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsComponent } from './post-details.component';
import { Post } from 'src/app/models/post';
import { first } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PostDetailsComponent', () => {

  let fixture: ComponentFixture<PostDetailsComponent>;
  let comp: PostDetailsComponent;

  beforeEach(() => {
    // Configure TestBed
    TestBed.configureTestingModule({
      declarations: [PostDetailsComponent],
      // schemas: [NO_ERRORS_SCHEMA]
    })

    // create fixture for accessing both html and ts
    fixture = TestBed.createComponent(PostDetailsComponent);

    // access component
    comp = fixture.componentInstance;
  })

  it("should check whether title text present or not", () => {
    let post: Post = {
      'id': 1,
      'title': 'Post 1',
      'body': 'Body 1'
    }

    comp.post = post;

    // it will update the data in html if any changes happens
    fixture.detectChanges();

    // check whether title text present or not
    let title: HTMLElement = fixture.nativeElement.querySelector('.title-link');

    expect(title.textContent).toContain('Post 1');
  })

  it("should check whether title text present or not using query", () => {
    let post: Post = {
      'id': 1,
      'title': 'Post 2',
      'body': 'Body 1'
    }

    comp.post = post;

    // it will update the data in html if any changes happens
    fixture.detectChanges();

    let title:HTMLElement = fixture.nativeElement;
    let a = title.querySelector('.title-link');

    expect(a?.textContent).toContain(post.title);
  })

  it("should check whether title text present or not Debug element", () => {
    let post: Post = {
      'id': 1,
      'title': 'Post 2',
      'body': 'Body 1'
    }

    comp.post = post;

    // it will update the data in html if any changes happens
    fixture.detectChanges();

    // if html dom is not ready then using nativeElement will cause error, to prevent from such
    // cases we can use debug element
    let debugElement = fixture.debugElement;
    let a:HTMLElement = debugElement.query(By.css('.title-link')).nativeElement;

    expect(a.textContent).toContain(post.title);
  })

  it("should create the component using Test Bed", () => {
    // test your comp created or not
    expect(comp).toBeTruthy();
    expect(comp).toBeDefined();

  })

  it("should call delete post and delete the post after clicking on the delete button", () => {
    let post: Post = {
      'id': 1,
      'title': 'Post 1',
      'body': 'Body 1'
    }

    comp.post = post;
    comp.delete.pipe(first()).subscribe(selectedPost => {
      expect(selectedPost).toEqual(post);
    });

    comp.deletePost();

  })
});
