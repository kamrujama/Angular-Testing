import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit{
  @Input() post!:Post;
  @Output() delete = new EventEmitter<Post>();


  ngOnInit() {
    // console.log("Post From child : ",this.post);
  }
  deletePost() {
    this.delete.emit(this.post);
  }
}
