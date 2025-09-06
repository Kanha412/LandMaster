import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LandRequirement } from '../models/land-requirement.model';
import { environment } from './environment';
 
@Injectable({
  providedIn: 'root'
})
export class LandRequirementService {
  private apiUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }
  getAllLandRequirements():Observable<LandRequirement[]>
  {
    return this.http.get<LandRequirement[]>(`${this.apiUrl}/api/landRequirements`)
  }
  getLandRequirementById(landRequirementId:number):Observable<LandRequirement>
  {
    return this.http.get<LandRequirement>(`${this.apiUrl}/api/landRequirements/${landRequirementId}`);
  }
  addLandRequirement(landRequirement: LandRequirement  ):Observable<LandRequirement>
  {
    return this.http.post<LandRequirement>(`${this.apiUrl}/api/landRequirements`,landRequirement);
  }
  updateLandRequirement(landRequirementId:number,landRequirement:LandRequirement):Observable<any>
  {
    return this.http.put<any>(`${this.apiUrl}/api/landRequirements/${landRequirementId}`,landRequirement);
  }
  deleteLandRequirement(landRequirementId:number):Observable<any>
  {
    return this.http.delete<any>(`${this.apiUrl}/api/landRequirements/${landRequirementId}`);
  }
 
}
 