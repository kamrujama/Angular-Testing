import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/Services/Post/post.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-home',
  templateUrl: './post-home.component.html',
  styleUrls: ['./post-home.component.scss']
})
export class PostHomeComponent implements OnInit {
  post!: Post;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getPost();
    this.post = {
      id: 1,
      title: 'Post 1',
      body: 'Body 1'
    }
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.postService.getPost(+id).subscribe(post => this.post = post);
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.postService.updatePost(this.post).subscribe(() => this.goBack());
  }
}
