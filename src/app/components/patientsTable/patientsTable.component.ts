import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/interface/list-of-patients';
import { PatientsService } from 'src/app/services/patients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
    private fb: FormBuilder,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.patients = await this.patientsService.getAllPatients();
    } catch (err) {
      alert(err.error ? err.error : err.message);
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    }
    this.editProfileForm = this.fb.group({
      address: [''],
      email: [''],
      phone: [''],
      hasCovid: [''],
    });
  }
  updatePatients = async () => {
    try {
      this.patients = await this.patientsService.getAllPatients();
    } catch (err) {
      alert(err.error ? err.error : err.message);
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    }
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
          alert('Patient Modified');
          this.patients = await this.patientsService.getAllPatients();
          this.modalService.dismissAll();
        },
        (err) => {
          alert('Error');
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
        alert('Patient Deleted');
      },
      (error) => {
        alert('Error');
        console.log('Error is, ', error);
      }
    );
    this.modalService.dismissAll();
    this.patients = await this.patientsService.getAllPatients();
  }
}
