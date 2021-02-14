import { Component, OnInit } from '@angular/core';
import { Patients } from 'src/app/interface/list-of-patients';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl:'./patients.component.html',
  styleUrls: ['./patients.component.css']
})

export class PatientsComponent implements OnInit {
  public patients: Patients[]=[];
  constructor(private patientsService:PatientsService) { }

  async ngOnInit(){
    this.patients =(await this.patientsService.all());
  }
} 
