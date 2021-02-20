import { Component, ComponentRef, Input, OnInit } from '@angular/core';
import { SwabsService } from 'src/app/services/swabs.service';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Swab } from 'src/app/interface/list-of-swabs';
import { Patient } from 'src/app/interface/list-of-patients';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-swabsTable',
  templateUrl: './swabsTable.component.html',
  styleUrls: ['./swabsTable.component.css'],
})
export class swabsTableComponent implements OnInit {
  public allSwabs: any;
  public daysSelected: string[] = [];
  public daysSelectedContent: any[] = [];
  public swabRange: any;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  action!: string;
  newSwab: Swab = {
    swab_id: 0,
    name: '',
    phone: '0',
    address: '',
    patient_id: '0',
    team_id: 0,
    date: '',
    type: 'mol',
    done: false,
    positive_res: false,
  };
  message!: string;
  startDate!: Date;
  endDate!: Date;
  swabToUpdate!: Swab;
  patients: Patient[] = [];
  time = { hour: 13, minute: 30 };
  swabForm: any;
  constructor(
    private swabsService: SwabsService,
    private patientsService: PatientsService,

    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}
  filterSwabs({ target: { selectedOptions } }: any, filter: string) {
    this.daysSelectedContent = Object.values(this.allSwabs);
    if (selectedOptions[0].value !== 'all')
      this.daysSelectedContent = this.daysSelectedContent.map((array: Swab[]) =>
        array.filter((swab: any) => swab[filter] === selectedOptions[0].value)
      );
  }
  updatePatients = async () => {
    this.patients = await this.patientsService.getAllPatients();
  };
  async ngOnInit() {
    this.range.valueChanges.subscribe(async () => await this.getSwabsByDate());
    this.patients = await this.patientsService.getAllPatients();
    this.allSwabs = await this.swabsService.allSwabs();
    this.daysSelected = Object.keys(this.allSwabs).map(
      (i) => moment(i).format('dddd') + ' ' + moment(i).format('DD-MM')
    );
    this.daysSelectedContent = Object.values(this.allSwabs);
    this.swabForm = this.fb.group({
      date: [''],
      done: [''],
      type: [''],
      time: [''],
      team_id: [''],
      positive_res: [''],
      patient_id: [''],
    });
  }
  getSwabsByDate = async () => {
    var ds = new Date(this.range.value.start);
    var dstostring = moment(ds).format('YYYY-MM-DD');
    var ed = new Date(this.range.value.end);
    var edtostring = moment(ed).format('YYYY-MM-DD');

    this.allSwabs = await this.swabsService.allSwabsByDate(
      dstostring,
      edtostring
    );
    this.daysSelected = Object.keys(this.allSwabs).map(
      (i) => moment(i).format('dddd') + ' ' + moment(i).format('DD-MM')
    );
    this.daysSelectedContent = Object.values(this.allSwabs);
  };
  openModal(targetModal: any, action: string, swab?: Swab) {
    this.action = action;
    this.swabToUpdate = swab ? swab : this.newSwab;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
    this.swabForm.patchValue({
      team_id: this.swabToUpdate.team_id,
      date: this.swabToUpdate.date.substr(0, 10),
      type: this.swabToUpdate.type,
      done: this.swabToUpdate.done,
      patient_id: this.swabToUpdate.patient_id,
      positive_res: this.swabToUpdate.positive_res,
    });
  }
  async onDelete() {
    try {
      await this.swabsService.deleteSwab(this.swabToUpdate.swab_id);
      alert('Swab deleted');
      this.modalService.dismissAll();
      await this.getSwabsByDate();
    } catch (error) {
      console.log(error);
      this.message = 'Error';
    }
  }
  async submitSwab() {
    try {
      if (this.action === 'update') {
        const res = await this.swabsService.updateSwab(
          this.swabToUpdate.swab_id,
          this.swabForm.getRawValue().team_id,
          this.swabForm.getRawValue().date +
            ' ' +
            Object.values(this.time).join(':'),
          this.swabForm.getRawValue().type,
          this.swabToUpdate.patient_id,
          Number(this.swabForm.getRawValue().done),
          Number(this.swabToUpdate.positive_res)
        );
        alert('Swab modified succesfully');
        this.modalService.dismissAll();
        await this.getSwabsByDate();
      } else if (this.action === 'post') {
        this.swabsService.addSwab(
          this.swabForm.getRawValue().team_id,
          this.swabForm.getRawValue().date +
            ' ' +
            Object.values(this.time).join(':'),
          this.swabForm.getRawValue().type,
          this.swabForm.getRawValue().patient_id,
          Number(this.swabForm.getRawValue().done),
          Number(this.swabForm.getRawValue().positive_res)
        );
        alert('Swab added succesfully');
        this.modalService.dismissAll();
        await this.getSwabsByDate();
      }
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
  }
}
