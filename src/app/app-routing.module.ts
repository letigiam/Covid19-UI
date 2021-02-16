import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientAddComponent } from './components/patient-add/patient-add.component';
import { PatientPutModalComponent } from './components/patient-put-modal/patient-put-modal.component';
import { PatientsComponent } from './components/patients/patients.component';
import { SwabComponent } from './components/swab/swab.component';

const routes: Routes = [
  {path:'patients', component:PatientsComponent,
    children:[
      {path:':id', component:PatientPutModalComponent},
      {path:'registerPatient', component:PatientAddComponent},
  ]
  },
  {path:'swabs', component:SwabComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
