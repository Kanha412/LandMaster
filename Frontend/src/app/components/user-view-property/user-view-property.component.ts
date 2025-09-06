import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-view-property',
  templateUrl: './user-view-property.component.html',
  styleUrls: ['./user-view-property.component.css']
})
export class UserViewPropertyComponent implements OnInit {

  properties: Property[] = [];
  propertyToDelete: Property | null = null;
  filteredProperties: Property[] = [];
  filter: string = '';
  sortColumn: string = '';
  sortDirection: string = '';
  userId: number | null = null;

  constructor(private propertyService: PropertyService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    if (this.userId !== null) {
      this.propertyService.getPropertiesByUserId(this.userId).subscribe((data: Property[]) => {
        this.properties = data;
        this.filteredProperties = data;
      });
    }
  }

  editProperty(propertyId: number): void {
    this.router.navigate(['/user/add-property', propertyId]);
  }

  confirmDelete(property: Property): void {
    this.propertyToDelete = property;
  }

  deleteProperty(): void {
    if (this.propertyToDelete) {
      this.propertyService.deleteProperty(this.propertyToDelete.PropertyId!).subscribe(() => {
        console.log(`Delete property with ID: ${this.propertyToDelete!.PropertyId}`);
        this.propertyToDelete = null;
        this.propertyService.getAllProperties().subscribe((data: Property[]) => {
          this.properties = data;
          this.filteredProperties = data;
        });
      });
    }
  }

  cancelDelete(): void {
    this.propertyToDelete = null;
  }

  filterProperties(): void {
    //Uncomment and implement filtering logic if needed
    console.log('Filter value:', this.filter);
    if (this.filter) {
      this.filteredProperties = this.properties.filter(l =>
        l.Location.toLowerCase().includes(this.filter.toLowerCase())
      );
    } else {
      this.filteredProperties = this.properties;
    }
    this.sortProperties(this.sortColumn, this.sortDirection);
    console.log('Filtered Properties:', this.filteredProperties);
  }

  sortProperties(column: string, direction: string): void {
    // Uncomment and implement sorting logic if needed
    this.sortColumn = column;
    this.sortDirection = direction;

    this.filteredProperties.sort((a, b) => {
      let valueA = a[column];
      let valueB = b[column];

      if (column === 'Price' || column === 'AreaSize' || column === 'NumberOfOwners') {
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

  page: number = 1;
  pageChanged(event: number): void {
    this.page = event;
  }
}
