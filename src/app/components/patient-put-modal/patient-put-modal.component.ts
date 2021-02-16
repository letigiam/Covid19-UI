import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patients } from 'src/app/interface/list-of-patients';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patient-put-modal',
  templateUrl: './patient-put-modal.component.html',
  styleUrls: ['./patient-put-modal.component.css'],
})
export class PatientPutModalComponent implements OnInit {
  public patient: any;
  public id: string = '';
  constructor(
    private activateRouter: ActivatedRoute,
    private patientsService: PatientsService
  ) {}

  async ngOnInit() {
    const idPatient = this.activateRouter.snapshot.params.patient_id;
    this.id = idPatient;
    console.log(this.id);
    // this.patient= await this.patientsService.getPatient(this.id);
    console.log(this.patient.patient_id);
  }
}
