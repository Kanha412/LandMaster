import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin-view-feedback',
  templateUrl: './admin-view-feedback.component.html',
  styleUrls: ['./admin-view-feedback.component.css']
})
export class AdminViewFeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  selectedUser: User | null = null;
  isProfileModalOpen: boolean = false;

  // for Pagination
  pageOfItems: Array<any> = [];
  currentIndex = -1;
  page = 1;
  count = 6;

  constructor(private feedbackService: FeedbackService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe((data) => {
      console.log('Feedback data:', data); // Log data to inspect structure
      this.feedbacks = data;
    });
  }

  showProfile(user: User): void {
    this.selectedUser = user;
    this.isProfileModalOpen = true;
  }

  closeProfileModal(): void {
    this.isProfileModalOpen = false;
    this.selectedUser = null;
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}
