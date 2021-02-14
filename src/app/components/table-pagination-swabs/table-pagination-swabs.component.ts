import { Component, OnInit } from '@angular/core';
import { Swabs } from 'src/app/interface/list-of-swabs'
import { SwabsService } from 'src/app/services/swabs.service';

@Component({
  selector: 'app-table-pagination-swabs',
  templateUrl: './table-pagination-swabs.component.html',
  styleUrls: ['./table-pagination-swabs.component.css']
})
export class TablePaginationSwabsComponent implements OnInit {
  public swabs: Swabs[]=[];
  displayedColumns: string[] = ['swab_id', 'team_id', 'date', 'type', 'patient_id', 'done', 'positive_res'];
  dataSource = this.swabs;
  
  constructor(private swabsService: SwabsService) { }

  async ngOnInit(){
    this.swabs = (await this.swabsService.allSwabs())
  }
}
