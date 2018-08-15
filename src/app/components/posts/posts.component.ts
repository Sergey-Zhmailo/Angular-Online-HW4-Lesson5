import { Component, OnInit } from '@angular/core';
import { PostsService } from "../../services/posts.service";
import { CommentsService } from "../../services/comments.service"
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  post: Post = {
    userId: 1,
    title: '',
    body: ''
  };
  comments: Comment[] ;
  comment: Comment = {
    postId: 1,
    name: '',
    email: '',
    body: ''
  };
  isAdmin = true;

  constructor(
    public postService: PostsService,
    public commentsService: CommentsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
      this.spinner.hide();
    });

  }

  onDelete(id:number) {
    this.spinner.show();
    this.postService.deletePost(id).subscribe((data: object) => {
      this.posts = this.posts.filter(post => post.id != id);
      this.spinner.hide();
      this.toastr.success('Post deleted success', 'Message');
    }, error => {
      this.spinner.hide();
      this.toastr.error(error.message, 'Error')
    });
  }

  onSubmit(post: Post) {
    this.posts.unshift(post);
    this.toastr.success('Post added success', 'Message');
  }

  onEdit(post: Post) {
    const editId = post.id - 1;
    this.posts.splice(editId, 1, post);
  }

  onShowComments(postId: number) {
    this.spinner.show();
    this.commentsService.getComment(postId).subscribe((comment: Comment[]) => {
      this.comments = comment;
      this.posts.forEach(onePost => {
        if (onePost.id === postId) {
          onePost.comments = this.comments;
        }

      });
      this.spinner.hide();
    });

  }

}
