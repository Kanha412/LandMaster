import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LandRequirementService } from '../../services/land-requirement.service';
import { LandRequirement } from 'src/app/models/land-requirement.model';
 
@Component({
  selector: 'app-admin-add-requirement',
  templateUrl: './admin-add-requirement.component.html',
  styleUrls: ['./admin-add-requirement.component.css']
})
export class AdminAddRequirementComponent implements OnInit {
  landRequirement: LandRequirement = {
    LandRequirementId:0,
    Title: '',
    Description: '',
    Location: '',
    AreaSize: 0,
    PostedDate: new Date(),
    Status: 'Active'
   
  }
 
  landRequirementForm: FormGroup;
  landrequirementId: number = 0;
  isEditMode: boolean = false;
  showPopup: boolean = false;
  titleExist=false;
 
  constructor(
    private fb: FormBuilder,
    private landRequirementService: LandRequirementService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.landRequirementForm = this.fb.group({
      Title: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Location: ['', [Validators.required]],
      AreaSize: ['', [Validators.required, Validators.min(1)]],
      Status: ['Active', [Validators.required]]
    });
  }
 
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.landrequirementId = +params['id'];
      if (this.landrequirementId) {
        this.isEditMode = true;
        this.landRequirementService.getLandRequirementById(this.landrequirementId).subscribe((data) => {
          this.landRequirementForm.patchValue(data);
        });
      }
    });
  }
 
  onSubmit(): void {
    if (this.landRequirementForm.invalid) {
      alert('All fields are required');
      return;
    }
 
    const landRequirement = {
      ...this.landRequirementForm.value,
      PostedDate: new Date()
    };
 
    if (this.isEditMode) {
      this.landRequirementService.updateLandRequirement(this.landrequirementId, landRequirement).subscribe(() => {
        this.showPopup = true;
      });
    } else {
     
      this.landRequirementService.addLandRequirement(landRequirement).subscribe(
        () => {
          this.showPopup = true;
        },
        (error) => {
          if (error.status === 409 ) {
            this.titleExist=true;
            // ('A requirement with the title already exists.');
          }
        }
      );
    }
  }
 
  onPopupOk(): void {
    this.showPopup = false;
    this.router.navigate(['/admin/view-requirement']);
  }
 
  back(): void {
    this.router.navigate(['/home']);
  }
}




