import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandRequirement } from 'src/app/models/land-requirement.model';
import { LandRequirementService } from 'src/app/services/land-requirement.service';
 
@Component({
  selector: 'app-admin-view-requirement',
  templateUrl: './admin-view-requirement.component.html',
  styleUrls: ['./admin-view-requirement.component.css']
})
export class AdminViewRequirementComponent implements OnInit {
 
  landRequirements: LandRequirement[] = [];
  filteredLandRequirements: LandRequirement[] = [];
  filter = "";
  showModal = false;
  itemToDelete: LandRequirement | null = null;
  temp: LandRequirement | null = null;
  sortColumn = "";
  sortDirection = "";
  page: number = 1;
 
  constructor(private landRequirementService: LandRequirementService, private router: Router) { }
 
  ngOnInit(): void {
    this.landRequirementService.getAllLandRequirements().subscribe((data) => {
      this.landRequirements = data;
      this.filteredLandRequirements = data;
      console.log(this.landRequirements);
    });
  }
 
  EditClickHandler(landrequirementId: number): void {
    this.router.navigate([`/landRequirement/edit/${landrequirementId}`]);
  }
 
  openDeleteModal(item: LandRequirement): void {
    this.itemToDelete = item;
    this.showModal = true;
  }
 
  closeDeleteModal(): void {
    this.showModal = false;
    this.itemToDelete = null;
  }
 
  confirmDelete(): void {
    if (this.itemToDelete) {
      this.landRequirementService.deleteLandRequirement(this.itemToDelete.LandRequirementId).subscribe(() => {
        this.landRequirements = this.landRequirements.filter(l => l.LandRequirementId !== this.itemToDelete?.LandRequirementId);
        this.filteredLandRequirements = this.filteredLandRequirements.filter(l => l.LandRequirementId !== this.itemToDelete?.LandRequirementId);
        this.closeDeleteModal();
      });
    }
  }
 
  ClosedClickHandler(item: LandRequirement): void {
    console.log("inClosedUpdate");
    this.landRequirementService.getLandRequirementById(item.LandRequirementId).subscribe((data) => {
      this.temp = data;
      if (this.temp) {
        console.log("temp found");
        this.temp.Status = this.temp.Status === 'Active' ? 'Closed' : 'Active';
        this.landRequirementService.updateLandRequirement(item.LandRequirementId, this.temp).subscribe(() => {
          console.log("Land Requirement updated successfully");
          item.Status = item.Status === 'Active' ? 'Closed' : 'Active';
        });
        console.log("update status");
        this.landRequirementService.getLandRequirementById(item.LandRequirementId).subscribe((data) => {
          console.log("My updated data", data);
        });
      }
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
 
  pageChanged(event: number): void {
    this.page = event;
  }
}
 