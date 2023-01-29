import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VesselService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vessel-create',
  templateUrl: './vessel-create.component.html',
  styleUrls: ['./vessel-create.component.less']
})
export class VesselCreateComponent implements OnInit{

  public vesselCreateForm!: FormGroup;

  constructor(private vesselService: VesselService,
              private router: Router) {}

  ngOnInit() {
    this.vesselCreateForm = new FormGroup({
      number: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      year: new FormControl('', ),
      length: new FormControl('', Validators.required),
      width: new FormControl('', Validators.required),
      grossWeight: new FormControl('', ),
      netWeight: new FormControl('', ),
      info: new FormControl('', Validators.required)

    });
  }

  public onSubmit() {
    this.vesselService.createVessel(
      this.vesselCreateForm.get('number')!.value,
      this.vesselCreateForm!.get('name')!.value,
      this.vesselCreateForm.get('year')!.value,
      this.vesselCreateForm.get('length')!.value,
      this.vesselCreateForm.get('width')!.value,
      this.vesselCreateForm.get('grossWeight')!.value,
      this.vesselCreateForm.get('netWeight')!.value,
      this.vesselCreateForm.get('info')!.value
    ).subscribe(res => {
      console.warn("Vessel Created");
      this.router.navigate(['/']);
    });
    
  }
}
