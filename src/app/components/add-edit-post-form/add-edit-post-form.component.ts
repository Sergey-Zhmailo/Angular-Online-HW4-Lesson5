import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { NgForm } from "@angular/forms";
import {Post} from "../models/Post";
import {PostsService} from "../../services/posts.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-edit-post-form',
  templateUrl: './add-edit-post-form.component.html',
  styleUrls: ['./add-edit-post-form.component.css']
})
export class AddEditPostFormComponent implements OnInit {
  @Output() addNewPostData: EventEmitter<Post> = new EventEmitter();
  @Output() editPostData: EventEmitter<Post> = new EventEmitter();

  addPostData: Post = {
    userId: 1,
    title: '',
    body: '',
    isShowComment: false,
    comments: []
  };
  constructor(
    public postService: PostsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.postService.editTaskEvent.subscribe((post: Post) => {
      this.addPostData = post;
    });
  }

  onSubmitPostData(form) {
    this.spinner.show();
    const newPost: Post = {
      title: this.addPostData.title,
      body: this.addPostData.body,
      userId: this.addPostData.userId
    };

    this.postService.addPost(newPost).subscribe((data: Post) => {
      if (data.id) {
        this.addNewPostData.emit(data);
      }
      this.spinner.hide();
    });

    form.reset();
  }

  onCancel() {
    this.postService.emitEditEvent({ title: '', body: '', userId: 1 });
  }

  onEditPostData(form, formId) {
    this.spinner.show();
    const editPost: Post = {
      title: this.addPostData.title,
      body: this.addPostData.body,
      userId: this.addPostData.userId
    };

    this.postService.editPost(editPost, formId).subscribe((data: Post) => {
      this.editPostData.emit(data);
      this.spinner.hide();
    });

    form.reset();
    this.onCancel();
  }

}
