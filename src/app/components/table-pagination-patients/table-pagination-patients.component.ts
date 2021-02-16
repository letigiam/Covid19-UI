import { Component, Input, OnInit } from '@angular/core';
import { Patients } from 'src/app/interface/list-of-patients';
import { PatientsService } from 'src/app/services/patients.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

//import { PeriodicElement} from 'src/app/interface/periodic-element';

@Component({
  selector: 'app-table-pagination-patients',
  templateUrl: './table-pagination-patients.component.html',
  styleUrls: ['./table-pagination-patients.component.css'],
})
export class TablePaginationPatientsComponent implements OnInit {
  @Input() patient_id!: string;
  public patients: any;
  editProfileForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private patientsService: PatientsService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.patients = await this.patientsService.getAllPatients();

    this.editProfileForm = this.fb.group({
      name: [''],
      email: [''],
      dob: [''],
      hasCovid: [''],
    });
  }
  openModal(targetModal: any, patient: Patients) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });

    this.editProfileForm.patchValue({
      name: patient.name,
      email: patient.email,
      dob: patient.dob,
      hasCovid: patient.hasCovid,
    });
  }
  onSubmit() {
    this.modalService.dismissAll();
    console.log('res:', this.editProfileForm.getRawValue());
  }
}
