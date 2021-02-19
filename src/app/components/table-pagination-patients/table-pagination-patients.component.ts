import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/interface/list-of-patients';
import { PatientsService } from 'src/app/services/patients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table-pagination-patients',
  templateUrl: './table-pagination-patients.component.html',
  styleUrls: ['./table-pagination-patients.component.css'],
})
export class TablePaginationPatientsComponent implements OnInit {
  public patients: any;
  editProfileForm!: FormGroup;
  patient!: Patient;
  message!: string;
  constructor(
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
    this.patient = patient;
    this.editProfileForm.patchValue({
      address: patient.address,
      email: patient.email,
      phone: patient.phone,
      hasCovid: patient.hasCovid,
    });
  }

  async onSubmit() {
    this.modalService.dismissAll();
    console.log(typeof this.patient.dob, this.editProfileForm.getRawValue());
    this.patientsService
      .updatePatient(
        this.patient.patient_id,
        this.patient.name,
        this.editProfileForm.getRawValue().address,
        this.editProfileForm.getRawValue().email,
        this.editProfileForm.getRawValue().phone,
        Number(this.editProfileForm.getRawValue().hasCovid),
        this.patient.dob,
        this.patient.fiscal_code
      )
      .subscribe(
        async (Response) => {
          this.message = 'Patient Modified';
          this.patients = await this.patientsService.getAllPatients();
        },
        (error) => {
          this.message = 'Error';
          console.log('Error is, ', error);
        }
      );
  }
  async onDelete() {
    this.patientsService.deletePatient(this.patient.patient_id).subscribe(
      (Response) => {
        this.message = 'Patient Deleted';
      },
      (error) => {
        this.message = 'Error';
        console.log('Error is, ', error);
      }
    );
    this.modalService.dismissAll();
    this.patients = await this.patientsService.getAllPatients();
  }
}
