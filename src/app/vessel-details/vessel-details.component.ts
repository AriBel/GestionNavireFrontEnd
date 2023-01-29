import { Component, OnInit} from '@angular/core';
import { Vessel } from '@app/_models';
import { AccountService } from '@app/_services';
import { VesselService } from '../_services';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-vessel-details',
  templateUrl: './vessel-details.component.html',
  styleUrls: ['./vessel-details.component.less']
})
export class VesselDetailsComponent implements OnInit{
  vesselNumber?: number;
  vessel?: Vessel;

  public vesselDetailsForm!: FormGroup;

  constructor(private vesselService: VesselService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.vesselNumber = +params.get('id')!;
    });

    this.vesselService.getVesselByNumber(this.vesselNumber?.toString()!).subscribe(res => {
      this.vessel = res;
      this.setFormValues();
    })

    this.vesselDetailsForm = new FormGroup({
      vesselNumber: new FormControl({value: '', disabled: true}, Validators.required),
      name: new FormControl('', Validators.required),
      yearOfConstruction: new FormControl('', ),
      length: new FormControl('', Validators.required),
      width: new FormControl('', Validators.required),
      grossWeight: new FormControl('', ),
      netWeight: new FormControl('', ),
      info: new FormControl('', Validators.required)
  
    });

    
  }

  public setFormValues ()
  {
    this.vesselDetailsForm.get('vesselNumber')!.setValue(this.vessel?.vesselNumber);
    this.vesselDetailsForm.get('name')!.setValue(this.vessel?.name);
    this.vesselDetailsForm.get('yearOfConstruction')!.setValue(this.vessel?.yearOfConstruction);
    this.vesselDetailsForm.get('length')!.setValue(this.vessel?.length);
    this.vesselDetailsForm.get('width')!.setValue(this.vessel?.width);
    this.vesselDetailsForm.get('grossWeight')!.setValue(this.vessel?.grossWeight);
    this.vesselDetailsForm.get('netWeight')!.setValue(this.vessel?.netWeight);
    this.vesselDetailsForm.get('info')!.setValue(this.vessel?.info);
    
  }

  public onMofify() {
    this.vesselService.updateVessel(
      this.vesselDetailsForm.get('vesselNumber')!.value,
      this.vesselDetailsForm!.get('name')!.value,
      this.vesselDetailsForm.get('yearOfConstruction')!.value,
      this.vesselDetailsForm.get('length')!.value,
      this.vesselDetailsForm.get('width')!.value,
      this.vesselDetailsForm.get('grossWeight')!.value,
      this.vesselDetailsForm.get('netWeight')!.value,
      this.vesselDetailsForm.get('info')!.value
    ).subscribe(res => {
      console.warn("Vessel Updated");
      this.router.navigate(['/']);
    });
  }

  public onDelete() {
    this.vesselService.DeleteVessel(

      this.vesselDetailsForm.get('vesselNumber')!.value   

    ).subscribe(res => {
      console.warn("Vessel Deleted");
      this.router.navigate(['/']);
    });
  }



}
