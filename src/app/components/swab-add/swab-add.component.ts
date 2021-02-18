import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/interface/list-of-patients';
import { PatientsService } from 'src/app/services/patients.service';
import { SwabsService } from 'src/app/services/swabs.service';

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
  done = '';
  positive_res = '';
  time = { hour: 13, minute: 30 };
  patients: Patient[] = [];
  constructor(
    private service: SwabsService,
    private patientService: PatientsService
  ) {}

  async ngOnInit() {
    this.patients = await this.patientService.getAllPatients();
  }
  postSwab = () => {
    this.service
      .addSwab(
        this.team_id,
        this.date + ' ' + Object.values(this.time).join(':'),
        this.type,
        this.patient_id,
        this.done,
        this.positive_res
      )
      .subscribe(
        (Response) => {
          this.message = 'Swab added succesfully';
        },
        (err) => {
          if (err.error.errors) {
            err.error.errors.forEach((item: {}) => {
              (<any>this)[Object.keys(item)[0]] =
                'ERROR ' + Object.values(item)[0];
            });
          } else {
            alert('ERROR ' + err.error);
          }
          this.message = 'Error';
          console.log(err);
        }
      );
  };
}
