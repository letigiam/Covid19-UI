import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/interface/list-of-patients';
import { PatientsService } from 'src/app/services/patients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-patientsTable',
  templateUrl: './patientsTable.component.html',
  styleUrls: ['./patientsTable.component.css'],
})
export class patientsTableComponent implements OnInit {
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
  updatePatients = async () => {
    this.patients = await this.patientsService.getAllPatients();
  };
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
          this.modalService.dismissAll();
        },
        (err) => {
          this.message = 'Error';
          console.log('Error is, ', err);
          if (err.error.errors) {
            err.error.errors.forEach((item: {}) => {
              (<any>this)[Object.keys(item)[0]] =
                'ERROR ' + Object.values(item)[0];
            });
          } else {
            alert('ERROR ' + err.error);
          }
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
