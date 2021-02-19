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
  message!: string;
  startDate!: Date;
  endDate!: Date;
  swabToUpdate!: Swab;
  time = { hour: 13, minute: 30 };
  editSwabForm: any;
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
    this.editSwabForm = this.fb.group({
      date: [''],
      done: [''],
      type: [''],
      time: [''],
      team_id: [''],
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
  openModal(targetModal: any, swab: Swab) {
    console.log(swab.swab_id);
    this.swabToUpdate = swab;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
    console.log(swab.date.substr(11, 16));
    this.editSwabForm.patchValue({
      team_id: swab.team_id,
      date: swab.date.substr(0, 10),
      // time: swab.date.substr(11, 14), NON FUNZIONA
      type: swab.type,
      done: swab.done,
    });
  }
  async onDelete() {
    try {
      await this.swabsService.deleteSwab(this.swabToUpdate.swab_id);
      this.message = 'Swab deleted';
      this.modalService.dismissAll();
      await this.getSwabsByDate();
    } catch (error) {
      console.log(error);
      this.message = 'Error';
    }
  }
  async onSubmit() {
    try {
      const res = await this.swabsService.updateSwab(
        this.swabToUpdate.swab_id,
        this.editSwabForm.getRawValue().team_id,
        this.editSwabForm.getRawValue().date,
        this.editSwabForm.getRawValue().type,
        this.swabToUpdate.patient_id,
        Number(this.editSwabForm.getRawValue().done),
        Number(this.swabToUpdate.positive_res)
      );
    } catch (error) {
      console.log(error);
    }
    this.modalService.dismissAll();
    await this.getSwabsByDate();
  }
}
