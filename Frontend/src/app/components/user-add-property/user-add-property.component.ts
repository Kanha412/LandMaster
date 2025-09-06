import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/models/property.model';
import { AuthService } from 'src/app/services/auth.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-user-add-property',
  templateUrl: './user-add-property.component.html',
  styleUrls: ['./user-add-property.component.css']
})
export class UserAddPropertyComponent implements OnInit {
  property: Property = {
    Title: '',
    Description: '',
    Location: '',
    AreaSize: 0,
    Price: 0,
    PostedDate: new Date(),
    Status: 'Pending',
    NumberOfOwners: 0,
    IsDtcpApproved: false,
    UserId: 0
  };

  propertyId: number = 0;
  isEditMode: boolean = false;
  showPopup: boolean = false;

  @ViewChild('addpropertyform') PropertyForm?: NgForm;

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.property.UserId = userId;
      this.activatedRoute.params.subscribe((params) => {
        this.propertyId = +params['id'];
        if (this.propertyId) {
          this.isEditMode = true;
          this.propertyService.getPropertyById(this.propertyId).subscribe((data) => {
            this.property = data;
          });
        }
      });
    } else {
      // Handle the case where userId is null, e.g., redirect to login
      this.router.navigate(['/login']);
    }
  }
  

  logCheckboxValue(): void {
    console.log('IsDtcpApproved:', this.property.IsDtcpApproved);
  }

  onSubmit(): void {
    if (this.PropertyForm?.invalid) {
      // alert('All fields are required');
      return;
    }

    const propertyData = {
      ...this.property,
      PostedDate: new Date()
    };

    if (this.isEditMode) {
      if (this.property.NumberOfOwners < 6 && this.property.NumberOfOwners > 0) {
        this.propertyService.updateProperty(this.propertyId, propertyData).subscribe(() => {
          this.showPopup = true;
        });
      }
    } else {
      if (this.property.NumberOfOwners < 6 && this.property.NumberOfOwners > 0) {
        this.propertyService.addProperty(propertyData).subscribe(() => {
          this.showPopup = true;
        });
      }
    }
  }

  onPopupOk(): void {
    this.showPopup = false;
    this.router.navigate(['/user/view-property']);
  }

  back(): void {
    this.router.navigate(['/home']);
  }
}
