import { Component, OnInit } from '@angular/core';
import { LandRequirement } from 'src/app/models/land-requirement.model';
import { LandRequirementService } from 'src/app/services/land-requirement.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-user-view-requirement',
  templateUrl: './user-view-requirement.component.html',
  styleUrls: ['./user-view-requirement.component.css']
})
export class UserViewRequirementComponent implements OnInit {
 
  constructor(private landRequirementService: LandRequirementService, private router: Router) { }
 
  landRequirements: LandRequirement[] = [];
  filteredLandRequirements: LandRequirement[] = [];
  filter = "";
  sortColumn = "";
  sortDirection = "";
 
  ngOnInit(): void {
    this.landRequirementService.getAllLandRequirements().subscribe((data) => {
      this.landRequirements = data;
      this.filteredLandRequirements = data;
      console.log(this.landRequirements);
    });
  }
 
  filterRequirements(): void {
    console.log('Filter value:', this.filter);
    if (this.filter) {
      this.filteredLandRequirements = this.landRequirements.filter(l =>
        l.Title.toLowerCase().includes(this.filter.toLowerCase()) ||
        l.Description.toLowerCase().includes(this.filter.toLowerCase())
      );
    } else {
      this.filteredLandRequirements = this.landRequirements;
    }
    this.sortRequirements(this.sortColumn, this.sortDirection);
    console.log('Filtered Requirements:', this.filteredLandRequirements);
   }
 
  sortRequirements(column: string, direction: string): void {
    this.sortColumn = column;
    this.sortDirection = direction;
 
    this.filteredLandRequirements.sort((a, b) => {
      let valueA = a[column];
      let valueB = b[column];
 
      if (column === 'AreaSize') {
        valueA = parseFloat(valueA);
        valueB = parseFloat(valueB);
      } else if (column === 'PostedDate') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      } else {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
 
      if (direction === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
   }

  
  page:number=1;
  pageChanged(event: number): void {
    this.page = event;
  }
}
 