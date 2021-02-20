import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Patient } from 'src/app/interface/list-of-patients';
import { PatientsService } from 'src/app/services/patients.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css'],
})
export class PatientAddComponent implements OnInit {
  @Output() emitter: EventEmitter<boolean> = new EventEmitter();
  name = '';
  email = '';
  dob = '';
  fiscal_code = '';
  address = '';
  phone = '';
  hasCovid: number = 0;
  message = '';
  addPatientForm!: FormGroup;
  picker = '';
  constructor(
    private patientsService: PatientsService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addPatientForm = this.fb.group({
      name: [''],
      email: [''],
      dob: [''],
      fiscal_code: [''],
      address: [''],
      phone: [''],
      hasCovid: [''],
    });
  }
  openModal(targetModal: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
  }

  async onSubmit() {
    this.patientsService
      .addPatient(
        this.addPatientForm.getRawValue().name,
        this.addPatientForm.getRawValue().email,
        this.addPatientForm.getRawValue().dob,
        this.addPatientForm.getRawValue().fiscal_code,
        this.addPatientForm.getRawValue().address,
        this.addPatientForm.getRawValue().phone,
        Number(this.addPatientForm.getRawValue().hasCovid)
      )
      .subscribe(
        (Response) => {
          alert('Patient registered');
          this.emitter.emit(true);
        },
        (err) => {
          if (err.error.errors) {
            err.error.errors.forEach((item: {}) => {
              (<any>this)[Object.keys(item)[0]] =
                'ERROR ' + Object.values(item)[0];
            });
          } else {
            alert('ERROR ' + err.error);
          }
          console.log(err);
        }
      );
  }
}
