import { Component, OnInit } from '@angular/core';
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
  errors: any = {};
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
    team_id: 1,
    date: '0000000000000',
    type: 'mol',
    done: false,
    positive_res: false,
  };
  message!: string;
  startDate!: Date;
  endDate!: Date;
  swabToUpdate!: Swab;
  patients: any = [];
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
    this.swabForm = this.fb.group({
      date: [''],
      done: [''],
      type: [''],
      time: [''],
      team_id: [''],
      positive_res: [''],
      patient_id: [''],
    });
    this.allSwabs = await this.swabsService.allSwabs();
    this.patients = await this.patientsService.getAllPatients();

    this.range.valueChanges.subscribe(this.getSwabsByDate);
    this.daysSelected = this.allSwabs
      ? Object.keys(this.allSwabs).map(
          (i) => moment(i).format('dddd') + ' ' + moment(i).format('DD-MM')
        )
      : ['No Swabs Found!!!!'];
    this.daysSelectedContent = Object.values(this.allSwabs);
  }
  getSwabsByDate = async () => {
    var ds = new Date(this.range.value.start);
    var dstostring = moment(ds).subtract(1, 'day').format('YYYY-MM-DD');
    var ed = new Date(this.range.value.end);
    var edtostring = moment(ed).add(1, 'day').format('YYYY-MM-DD');

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
    await this.swabsService.deleteSwab(this.swabToUpdate.swab_id);
    alert('Swab deleted');
    this.modalService.dismissAll();
    this.range.value.endDate
      ? await this.getSwabsByDate()
      : (this.allSwabs = await this.swabsService.allSwabs());
  }
  async submitSwab() {
    if (this.action === 'update') {
      this.swabsService
        .updateSwab(
          this.swabToUpdate.swab_id,
          this.swabForm.getRawValue().team_id,
          this.swabForm.getRawValue().date +
            ' ' +
            Object.values(this.time).join(':'),
          this.swabForm.getRawValue().type,
          this.swabToUpdate.patient_id,
          Number(this.swabForm.getRawValue().done),
          Number(this.swabToUpdate.positive_res)
        )
        .subscribe(
          async (res) => {
            alert('Swab updated succesfully');
            this.modalService.dismissAll();
            this.errors = {};
            await this.getSwabsByDate();
          },
          (err) => {
            console.log(err);
            if (err.error.errors) {
              err.error.errors.forEach((item: {}) => {
                (<any>this.errors)[Object.keys(item)[0]] = Object.values(
                  item
                )[0];
              });
            }
          }
        );
    } else if (this.action === 'post') {
      this.swabsService
        .addSwab(
          this.swabForm.getRawValue().team_id,
          this.swabForm.getRawValue().date +
            ' ' +
            Object.values(this.time).join(':'),
          this.swabForm.getRawValue().type,
          this.swabForm.getRawValue().patient_id,
          Number(this.swabForm.getRawValue().done),
          Number(this.swabForm.getRawValue().positive_res)
        )
        .subscribe(
          async (res) => {
            alert('Swab added succesfully');
            this.modalService.dismissAll();
            await this.getSwabsByDate();
            this.errors = {};
          },
          (err) => {
            if (err.error.errors) {
              err.error.errors.forEach((item: {}) => {
                (<any>this.errors)[Object.keys(item)[0]] = Object.values(
                  item
                )[0];
              });
            }
          }
        );
    }
  }
}
