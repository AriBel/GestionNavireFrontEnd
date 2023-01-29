import { Component } from '@angular/core';

import { User } from '@app/_models';
import { Vessel } from '@app/_models';
import { AccountService } from '@app/_services';
import { VesselService } from '../_services';
import { Observable, Subject } from 'rxjs';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User | null;
    vessels?: Vessel[];

    constructor(private accountService: AccountService,
                private vesselService: VesselService) {
        this.user = this.accountService.userValue;
        this.vesselService.getAllVessels().subscribe(res => {
            this.vessels = res;
        });
    }

    columnDefs = [
        {headerName: 'Numéro', field: 'id'},
        {headerName: 'Nom', field: 'name'},
        {headerName: 'Année de construction', field: 'year'},
        {headerName: 'Longueur', field: 'length'},
        {headerName: 'Largeur', field: 'width'},
        {headerName: 'Tonnage brut', field: 'grossWeight'},
        {headerName: 'Tonnage net', field: 'netWeight'},
        {headerName: 'Info', field: 'info'},
    ];
    
    rowData = [
      this.vessels
    ];
    
    logout(): void {
      this.accountService.logout();
    }
}