import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-user-add-feedback',
  templateUrl: './user-add-feedback.component.html',
  styleUrls: ['./user-add-feedback.component.css']
})
export class UserAddFeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  userId: number | null = null;

  constructor(private feedbackService: FeedbackService, private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.feedbackForm = this.fb.group({
      feedbackText: ['', [Validators.required]]
    });
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void { }

  get f() {
    return this.feedbackForm.controls;
  }

  addFeedback() {
    if (this.userId !== null) {
      let feedback: Feedback = {
        FeedbackText: this.feedbackForm.value.feedbackText,
        UserId: this.userId,
        Date: new Date()
      };
      this.feedbackService.sendFeedback(feedback).subscribe((data) => {
        console.log('Feedback added:', data);
        this.showSuccessMessage();
      }, (error) => {
        // Handle error
        alert('There was an error submitting your feedback');
      });
    } else {
      alert('User ID is not available');
    }
  }

  addEmoji(emoji: string, text: string) {
    const feedbackTextControl = this.feedbackForm.get('feedbackText');
    if (feedbackTextControl) {
      const currentText = feedbackTextControl.value;
      feedbackTextControl.setValue(currentText + ' ' + text);
    } else {
      console.error('Feedback text control not found.');
    }
  }

  showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage?.classList.add('active');
  }

  closeSuccessMessage() {
    this.feedbackForm.reset();
    this.router.navigate(['/user/view-feedback']);
    const successMessage = document.getElementById('successMessage');
    successMessage?.classList.remove('active');
  }

  back() {
    this.router.navigate(['/user/viewfeedback']);
  }
}
