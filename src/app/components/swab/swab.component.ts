import { Component, OnInit } from '@angular/core';
import { Swab } from 'src/app/interface/list-of-swabs';
import { SwabsService } from 'src/app/services/swabs.service';

@Component({
  selector: 'app-swab',
  templateUrl: './swab.component.html',
  styleUrls: ['./swab.component.css'],
})
export class SwabComponent implements OnInit {
  public swabs: Swab[] = [];
  constructor(private swabsService: SwabsService) {}

  async ngOnInit() {
    // this.swabs = (await this.swabsService.allSwabs())
  }
}
