import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-admin-view-property',
  templateUrl: './admin-view-property.component.html',
  styleUrls: ['./admin-view-property.component.css']
})
export class AdminViewPropertyComponent implements OnInit {
 
  constructor(private propertyService: PropertyService, private router: Router) { }
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  filter: string = '';
  sortColumn: string = '';
  sortDirection: string = '';
  page: number = 1;
  prop: Property = {
    PropertyId: 0,
    Title: "",
    Description: "",
    Location: "",
    AreaSize: 0,
    Price: 0,
    PostedDate: null,
    Status: "",
    NumberOfOwners: 0,
    IsDtcpApproved: false
  };
 
  ngOnInit(): void {
    this.loadProperties();
  }
 
  loadProperties() {
    this.propertyService.getAllProperties().subscribe(data => {
      this.properties = data;
      this.filteredProperties = data;
    });
   
  }
  updateStatusApprove(itemId: number) {
    this.propertyService.getPropertyById(itemId).subscribe(data => {
      console.log("Data", data);
      this.prop = data;
      this.prop.Status = "Approved";
      console.log("prop=", this.prop);
      this.propertyService.updateProperty(itemId, this.prop).subscribe(() => {
        console.log("Property Updated");
        this.loadProperties(); // Refresh properties after update
      });
    });
  }
  
 
  updateStatusReject(itemId: number) {
    this.propertyService.getPropertyById(itemId).subscribe(data => {
      console.log("Data", data);
      this.prop = data;
      this.prop.Status = "Rejected";
      console.log("prop=", this.prop);
      this.propertyService.updateProperty(itemId, this.prop).subscribe(() => {
        console.log("Property Updated");
        this.loadProperties(); // Refresh properties after update
      });
    });
  }
 
  filterProperties(): void {
    console.log('Filter value:', this.filter);
    if (this.filter) {
      this.filteredProperties = this.properties.filter(l =>
        l.Title.toLowerCase().includes(this.filter.toLowerCase()) ||
        l.Description.toLowerCase().includes(this.filter.toLowerCase())
      );
    } else {
      this.filteredProperties = this.properties;
    }
    this.sortProperties(this.sortColumn, this.sortDirection); // Apply sort after filtering
    console.log('Filtered Properties:', this.filteredProperties);
  }
 
  sortProperties(column: string, direction: string): void {
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



  
 
  pageChanged(event: number): void {
    this.page = event;
  }
}
 