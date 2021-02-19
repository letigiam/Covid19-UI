import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { SwabsService } from 'src/app/services/swabs.service';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Swab } from 'src/app/interface/list-of-swabs';

@Component({
  selector: 'app-table-pagination-swabs',
  templateUrl: './table-pagination-swabs.component.html',
  styleUrls: ['./table-pagination-swabs.component.css'],
})
export class TablePaginationSwabsComponent implements OnInit {
  public allSwabs: any;
  public daysSelected: string[] = [];
  public daysSelectedContent: any[] = [];
  public swabRange: any;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  startDate!: Date;
  endDate!: Date;

  time = { hour: 13, minute: 30 };
  editProfileForm: any;
  constructor(
    private swabsService: SwabsService,
    private router: Router,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    try {
      this.allSwabs = await this.swabsService.allSwabs();
    } catch (err) {
      alert(err.error);

      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    }
    this.daysSelected = Object.keys(this.allSwabs).map(
      (i) => moment(i).format('dddd') + ' ' + moment(i).format('DD-MM')
    );
    this.daysSelectedContent = Object.values(this.allSwabs);
    this.editProfileForm = this.fb.group({
      address: [''],
      email: [''],
      phone: [''],
      hasCovid: [''],
    });
  }
  getSwabsByDate = async () => {
    this.allSwabs = await this.swabsService.allSwabsByDate(
      moment(String(this.startDate).substr(0, 16)).format('YYYY-MM-DD'),
      moment(String(this.endDate).substr(0, 16)).format('YYYY-MM-DD')
    );
    this.daysSelected = Object.keys(this.allSwabs).map(
      (i) => moment(i).format('dddd') + ' ' + moment(i).format('DD-MM')
    );
    this.daysSelectedContent = Object.values(this.allSwabs);
  };

  // openModal(targetModal: any, swab: Swab) {
  //   this.modalService.open(targetModal, {
  //     centered: true,
  //     backdrop: 'static',
  //   });

  //   this.editProfileForm.patchValue({
  //     patient,
  //     email: patient.email,
  //     phone: patient.phone,
  //     hasCovid: patient.hasCovid,
  //   });
  // }

  // async onSubmit() {
  //   this.modalService.dismissAll();
  //   this.patientModified = this.editProfileForm.getRawValue();
  //   this.putPatient();
  // }
  // async onDelete() {
  //   this.delPatient();
  //   this.modalService.dismissAll();
  //   this.patients = await this.patientsService.getAllPatients();
  // }
  // putPatient = () => {
  //   this.patientsService
  //     .putPatient(
  //       this.id_patient,
  //       this.patientModified.address,
  //       this.patientModified.email,
  //       this.patientModified.phone,
  //       Number(this.patientModified.hasCovid)
  //     )
  //     .subscribe(
  //       async (Response) => {
  //         this.message = 'Patient Modified';
  //         this.patients = await this.patientsService.getAllPatients();
  //       },
  //       (error) => {
  //         this.message = 'Error';
  //         console.log('Error is, ', error);
  //       }
  //     );
  // };

  // setId(patient_id: string) {
  //   console.log(patient_id);
  //   this.id_patient = patient_id;
  // }

  // delSwab = () => {
  //   this.patientsService.deletePatient(this.id_patient).subscribe(
  //     (Response) => {
  //       this.message = 'Patient Deleted';
  //     },
  //     (error) => {
  //       this.message = 'Error';
  //       console.log('Error is, ', error);
  //     }
  //   );
  // };
}
