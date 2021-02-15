import { Component, OnInit } from '@angular/core';
import { Patients } from 'src/app/interface/list-of-patients';

@Component({
  selector: 'app-patients',
  templateUrl:'./patients.component.html',
  styleUrls: ['./patients.component.css']
})

export class PatientsComponent implements OnInit {
  public patients: Patients[]=[];
  constructor() { }
  async ngOnInit(){}
} 
