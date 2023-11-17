import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/Services/Post/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{
  post: Post[] = [];
  constructor(private postService: PostService) {}
  ngOnInit():void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(post => {
      this.post = post
    })
  }

  deletePost(post:Post) {
    this.post = this.post.filter( (p) => p.id !== post.id);
    this.postService.deletePost(post).subscribe();
  }

}



