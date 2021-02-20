import { Component, Input, OnInit } from '@angular/core';
import { SwabsService } from 'src/app/services/swabs.service';
import { PatientsService } from 'src/app/services/patients.service';
import { Patient } from 'src/app/interface/list-of-patients';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Swab } from 'src/app/interface/list-of-swabs';
@Component({
  selector: 'app-swab-add',
  templateUrl: './swab-add.component.html',
  styleUrls: ['./swab-add.component.css'],
})
export class SwabAddComponent implements OnInit {
  message = '';
  team_id = '';
  date = '';
  type = '';
  patient_id = '';
  alreadyDone = false;
  positive_res = false;
  time = { hour: 13, minute: 30 };
  patients: Patient[] = [];
  swabAddForm!: FormGroup;

  constructor(
    private swabsService: SwabsService,
    private patientsService: PatientsService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.patients = await this.patientsService.getAllPatients();
    this.swabAddForm = this.fb.group({
      team: [''],
      date: [''],
      swabType: [''],
      email: [''],
      patients: [''],
      alreadyDone: [''],
      positive_res: [''],
    });
  }
  openModal(targetModal: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
  }

  async onSubmit() {
    try {
      this.swabsService.addSwab(
        this.team_id,
        this.date + ' ' + Object.values(this.time).join(':'),
        this.type,
        this.patient_id,
        Number(this.alreadyDone),
        Number(this.positive_res)
      );
      this.message = 'Swab added succesfully';
    } catch (err) {
      if (err.error.errors) {
        err.error.errors.forEach((item: {}) => {
          (<any>this)[Object.keys(item)[0]] = 'ERROR ' + Object.values(item)[0];
        });
      } else {
        alert('ERROR ' + err.error);
      }
      this.message = 'Error';
      console.log(err);
    }
    alert(this.message);
  }
}
