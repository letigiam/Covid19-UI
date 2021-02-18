import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
    console.log(this.range.value.start, this.range.value.end);
    this.allSwabs = await this.swabsService.allSwabsByDate(
      this.range.value.start,
      this.range.value.end
    );
    console.log(this.allSwabs);
  };
}
