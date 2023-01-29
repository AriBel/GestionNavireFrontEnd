import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType, AlertOptions } from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Vessel } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';

    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(message: string, options?: AlertOptions) {
        this.alert(new Alert({ ...options, type: AlertType.Success, message }));
    }

    error(message: string, options?: AlertOptions) {
        this.alert(new Alert({ ...options, type: AlertType.Error, message }));
    }

    info(message: string, options?: AlertOptions) {
        this.alert(new Alert({ ...options, type: AlertType.Info, message }));
    }

    warn(message: string, options?: AlertOptions) {
        this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
    }

    // main alert method    
    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }
}
@Injectable({
    providedIn: 'root',
  })
export class VesselService {


    constructor(private http: HttpClient) {}
  
    getAllVessels(): Observable<Vessel[]> {
      return this.http.get<Vessel[]>(`${environment.apiUrl}/vessel/all`);
    }

    getVesselByNumber(vesselNumber : string): Observable<Vessel> {
        return this.http.get<Vessel>(`${environment.apiUrl}/vessel/${vesselNumber}`);
    }
  
    createVessel(vesselNumber: string, name: string, yearOfConstruction: number, length: number,
        width: number, grossWeight:number, netWeight:number, info:number): Observable<string> {

        return this.http.post(
            environment.apiUrl + '/vessel/create',
            {
              vesselNumber: vesselNumber,
              name: name,
              yearOfConstruction: yearOfConstruction,
              length: length,
              width: width,
              grossWeight: grossWeight,
              netWeight: netWeight,
              info: info

            },
            { responseType: 'text' }
        );
    }

    updateVessel(vesselNumber: string, name: string, yearOfConstruction: number, length: number,
        width: number, grossWeight:number, netWeight:number, info:number): Observable<string> {

        return this.http.post(
            environment.apiUrl + '/vessel/update',
            {
              vesselNumber: vesselNumber,
              name: name,
              yearOfConstruction: yearOfConstruction,
              length: length,
              width: width,
              grossWeight: grossWeight,
              netWeight: netWeight,
              info: info

            },
            { responseType: 'text' }
        );
    }

    DeleteVessel (vesselNumber : string): Observable<any> {
        return this.http.post(
            environment.apiUrl + '/vessel/delete',
            {
              vesselNumber: vesselNumber,
      
            },
            { responseType: 'text' }
        );
    }
}