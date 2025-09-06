 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';
import { Injectable } from '@angular/core';
import { environment } from './environment';
 
@Injectable({
  providedIn: 'root'
})
export class PropertyService {
 
  private apiUrl=environment.apiUrl;
  constructor(public http:HttpClient) { }
 
  getAllProperties() : Observable<Property[]>
  {
    return this.http.get<Property[]>(`${this.apiUrl}/api/properties`)
  }
 
  getPropertyById(propertyId : number) : Observable<Property>{
    return this.http.get<Property>(`${this.apiUrl}/api/properties/${propertyId}`)
  }
 
  addProperty(property : Property) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/properties`, property)
  }
 
  updateProperty(propertyId : number, property : Property) : Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/api/properties/${propertyId}`, property)
  }
 
  deleteProperty(propertyId : number) : Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/api/properties/${propertyId}`)
  }
  getPropertiesByUserId(userid:number):Observable<Property[]>
  {
    return this.http.get<Property[]>(`${this.apiUrl}/api/properties/user/${userid}`);
  }
}
 
 
 
 
 
 
 
 
 