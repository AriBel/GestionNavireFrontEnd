import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vessel } from '@app/_models';

@Injectable({
  providedIn: 'root',
})
export class VesselService {


  constructor(private http: HttpClient) {}

  getAllVessels(): Observable<Vessel[]> {
    return this.http.get<Vessel[]>(`${environment.apiUrl}/users`);
  }

//     getAll() {
//     return this.http.get<User[]>(`${environment.apiUrl}/users`);
//     }
}