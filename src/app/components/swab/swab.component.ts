import { Component, OnInit } from '@angular/core';
import { Swabs } from 'src/app/interface/list-of-swabs'
import { SwabsService } from 'src/app/services/swabs.service';

@Component({
  selector: 'app-swab',
  templateUrl: './swab.component.html',
  styleUrls: ['./swab.component.css']
})
export class SwabComponent implements OnInit {
  public swabs: Swabs[]=[];
  swab_id: number=0;
  team_id: number=0;
  date: string="";
  type: "rap" | "sier" | "mol" | undefined;
  patient_id: number=0;
  done: boolean=false;
  positive_res: boolean=false;

  constructor(private swabsService: SwabsService) { }

  async ngOnInit(){
    this.swabs = (await this.swabsService.allSwabs())
  }

}
