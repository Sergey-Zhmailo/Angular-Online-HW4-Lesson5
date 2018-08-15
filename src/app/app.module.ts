import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostsService } from "./services/posts.service";
import { CommentsService } from "./services/comments.service"
import { PostsComponent } from './components/posts/posts.component';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from "@angular/forms";
import { PostItemComponent } from './components/post-item/post-item.component';
import { AddEditPostFormComponent } from './components/add-edit-post-form/add-edit-post-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostsComponent,
    PostItemComponent,
    AddEditPostFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    FormsModule
  ],
  providers: [PostsService, CommentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
