import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';
import { environment } from './environment';
 
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl=environment.apiUrl;
  constructor(private http:HttpClient ) { }
 
  sendFeedback(feedback:Feedback):Observable<any>
  {
    return this.http.post<Feedback>(`${this.apiUrl}/api/feedback`,feedback);
  }
  getAllFeedbacksByUserId(userId:number)
  {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback/user/${userId}`);
  }
  deleteFeedback(feedbackId:number):Observable<any>
  {
    return this.http.delete<any>(`${this.apiUrl}/api/feedback/${feedbackId}`);
  }
  getFeedbacks():Observable<Feedback[]>
  {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback`);
  }
 
}
 
 