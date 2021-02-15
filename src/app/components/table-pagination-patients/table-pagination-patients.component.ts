import { Component, OnInit } from '@angular/core';
import { Patients } from 'src/app/interface/list-of-patients';
import { PatientsService } from 'src/app/services/patients.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
//import { PeriodicElement} from 'src/app/interface/periodic-element';

@Component({
  selector: 'app-table-pagination-patients',
  templateUrl: './table-pagination-patients.component.html',
  styleUrls: ['./table-pagination-patients.component.css']
})
export class TablePaginationPatientsComponent implements OnInit {
  public patients: Patients[]=[];
  displayedColumns: string[] = ['patient_id', 'name', 'fiscal_code', 'dob', 'address', 'email', 'phone', 'hasCovid', 'model'];
  dataSource = this.patients;
  
  constructor(private patientsService:PatientsService) { }

  async ngOnInit(){
    this.patients =(await this.patientsService.all());
  }
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
}
