import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/interface/list-of-patients';
import { PatientsService } from 'src/app/services/patients.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-table-pagination-patients',
  templateUrl: './table-pagination-patients.component.html',
  styleUrls: ['./table-pagination-patients.component.css'],
})
export class TablePaginationPatientsComponent implements OnInit {
  @Input() patient_id!: string;
  public patients: any;
  editProfileForm!: FormGroup;
  public id_patient = '';
  email = '';
  address = '';
  phone = 0;
  hasCovid = false;
  message = '';
  public patientModified: any;

  constructor(
    private route: ActivatedRoute,
    private patientsService: PatientsService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.patients = await this.patientsService.getAllPatients();

    this.editProfileForm = this.fb.group({
      address: [''],
      email: [''],
      phone: [''],
      hasCovid: [''],
    });
  }

  openModal(targetModal: any, patient: Patient) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });

    this.editProfileForm.patchValue({
      address: patient.address,
      email: patient.email,
      phone: patient.phone,
      hasCovid: patient.hasCovid,
    });
  }

  async onSubmit() {
    this.modalService.dismissAll();
    this.patientModified = this.editProfileForm.getRawValue();
    this.putPatient();
    this.patients.push(this.patientModified);
  }
  async onDelete() {
    this.delPatient();
    this.modalService.dismissAll();
    this.patients = await this.patientsService.getAllPatients();
  }
  putPatient = () => {
    this.patientsService
      .putPatient(
        this.id_patient,
        this.patientModified.address,
        this.patientModified.email,
        this.patientModified.phone,
        this.patientModified.hasCovid
      )
      .subscribe(
        (Response) => {
          this.message = 'Patient Modified';
        },
        (error) => {
          this.message = 'Error';
          console.log('Error is, ', error);
        }
      );
  };

  setId(patient_id: string) {
    console.log(patient_id);
    this.id_patient = patient_id;
  }

  delPatient = () => {
    this.patientsService.deletePatient(this.id_patient).subscribe(
      (Response) => {
        this.message = 'Patient Delete';
      },
      (error) => {
        this.message = 'Error';
        console.log('Error is, ', error);
      }
    );
  };
}
