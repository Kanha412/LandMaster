import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-user-view-feedback',
  templateUrl: './user-view-feedback.component.html',
  styleUrls: ['./user-view-feedback.component.css']
})
export class UserViewFeedbackComponent implements OnInit {

  feedbackIdtoDelete!: number;
  feedbacks!: Feedback[];
  selectedFeedbackId!: number;
  isModalOpen!: boolean;
  UserId: number | null = null;

  pageOfItems: Array<any> = [];

  currentIndex = -1;
  page = 1;
  count = 6;

  constructor(private feedbackService: FeedbackService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.UserId = this.authService.getUserId();
    if (this.UserId !== null) {
      console.log(this.UserId);
      this.feedbackService.getAllFeedbacksByUserId(this.UserId).subscribe(data => { 
        this.feedbacks = data;
      });
    }
  }

  openDeleteModal(feedbackId: number): void {
    this.feedbackIdtoDelete = feedbackId;
    this.isModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isModalOpen = false;
    this.feedbackIdtoDelete = 0;
  }

  deleteFeedback(): void {
    if (this.feedbackIdtoDelete !== null) {
      this.feedbackService.deleteFeedback(this.feedbackIdtoDelete).subscribe(() => {
        this.feedbacks = this.feedbacks.filter(feedback => feedback.FeedbackId !== this.feedbackIdtoDelete);
        this.closeDeleteModal();
      });
    }
  }

  onChangePage(pageOfItems: Array<any>): void {
    this.pageOfItems = pageOfItems;
  }
}
