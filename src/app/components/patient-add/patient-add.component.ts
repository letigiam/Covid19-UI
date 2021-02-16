import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {
  name="";
  email="";
  dob="";
  fiscal_code="";
  address="";
  phone=0;
  hasCovid=false;
  message="";
  constructor(private service:PatientsService) { }

  ngOnInit(): void {
  }
  postPatient=()=>{
    this.service.addPatient(this.name, this.email, this.dob, this.fiscal_code, this.address, this.phone, this.hasCovid).subscribe((Response)=>{
      this.message = "Paziente Registrato Correttamente";      
      },(error)=>{
        this.message="Errore durante la registrazione";
        console.log("Error is,", error);
    })
  }
}
