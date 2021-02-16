import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Patients } from 'src/app/interface/list-of-patients';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patient-put-modal',
  templateUrl: './patient-put-modal.component.html',
  styleUrls: ['./patient-put-modal.component.css']
})
export class PatientPutModalComponent implements OnInit {
  public patient:any;
  public id="";
  @Input() patient_id:any;

  constructor(private activateRouter:ActivatedRoute, private patientsService:PatientsService) { 
   // this.patient_id= String(this.activateRouter.snapshot.params.id);
    //console.log(this.patient_id);
   // console.log("this.id:"+this.patient_id);
  }

   ngOnInit(){
   
   // this.patient= await this.patientsService.getPatient(this.id);
    //console.log(this.patient.patient_id);
  }
 
 
}
