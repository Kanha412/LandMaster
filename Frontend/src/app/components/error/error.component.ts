import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMessage: string | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const errorCode = params['errorCode'];
      this.setErrorMessage(errorCode);
    });
  }

  setErrorMessage(errorCode: string): void {
    switch (errorCode) {
      case '400':
        this.errorMessage = "Bad Request. The server could not understand the request due to invalid syntax.";
        break;
      case '401':
        this.errorMessage = "Unauthorized. You are not authorized to access this page.";
        break;
      case '403':
        this.errorMessage = "Forbidden. You do not have permission to access this page.";
        break;
      case '404':
        this.errorMessage = "The page you're looking for doesn't exist. Please check the URL or return to the homepage.";
        break;
      case '500':
        this.errorMessage = "We're experiencing some technical issues. Please try again later or contact support.";
        break;
      case '502':
        this.errorMessage = "Bad Gateway. The server received an invalid response from the upstream server.";
        break;
      case '503':
        this.errorMessage = "Service Unavailable. The server is currently unable to handle the request. Please try again later.";
        break;
      default:
        this.errorMessage = "An unexpected error occurred. Please try again later.";
    }
  }
}