import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs/index";
import {Post} from "../components/models/Post";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = environment.api_url;
  private editTask: BehaviorSubject<Post> = new BehaviorSubject({ title: '', body: '', userId: 1 });
  public editTaskEvent = this.editTask.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  getPosts():Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  deletePost(id: number):Observable<Object> {
    return this.http.delete<Object>(`${this.apiUrl}/posts/${id}`);
  }

  addPost(post: Post):Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post);
  }

  emitEditEvent(post: Post):void {
    this.editTask.next(post);
  }

  editPost(post: Post, id: number):Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/posts/${id}`, post);
  }
}
