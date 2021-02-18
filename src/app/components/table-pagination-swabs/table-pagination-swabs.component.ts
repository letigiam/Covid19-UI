import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Swab, SwabCalendar } from 'src/app/interface/list-of-swabs';
import { SwabsService } from 'src/app/services/swabs.service';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table-pagination-swabs',
  templateUrl: './table-pagination-swabs.component.html',
  styleUrls: ['./table-pagination-swabs.component.css'],
})
export class TablePaginationSwabsComponent implements OnInit {
  public allSwabs: any;
  public daysSelected: string[] = [];
  public daysSelectedContent: any[] = [];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  startDate!: Date;
  endDate!: Date;

  time = { hour: 13, minute: 30 };
  constructor(private swabsService: SwabsService, private router: Router) {}

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
}
