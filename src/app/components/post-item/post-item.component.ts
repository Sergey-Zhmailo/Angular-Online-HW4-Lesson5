import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Post} from "../models/Post";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input('post') postItem: Post;
  @Output() deletePost: EventEmitter<number> = new EventEmitter();
  @Output() getPostComments: EventEmitter<number> = new EventEmitter();
  editPostId: number;

  constructor(
    public postService: PostsService
  ) { }

  ngOnInit() {
    this.postService.editTaskEvent.subscribe((post: Post) => {
      if (post.id === this.postItem.id) {
        this.editPostId = post.id;
      } else {
        this.editPostId = 0;
      }
    });
  }

  onDeletePost(id: number) {
    this.deletePost.emit(id);
  }
  onShowPostComments(postId: number) {
    this.getPostComments.emit(postId);
  }

  onEdit(post: Post) {
    const updPost = {
      title: post.title,
      body: post.body,
      userId: post.userId,
      id: post.id
    };
    this.postService.emitEditEvent(updPost);
  }

  onCancel() {
    this.postService.emitEditEvent({ title: '', body: '', userId: 1 });
  }

}
