import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getPost(id: number) {
    return this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  deletePost(post: Post) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`);
  }

  updatePost(post:Post) {
    return this.http.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
  }
}
