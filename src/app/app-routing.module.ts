import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientPutModalComponent } from './components/patient-put-modal/patient-put-modal.component';
import { PatientsComponent } from './components/patients/patients.component';
import { SwabComponent } from './components/swab/swab.component';

const routes: Routes = [
  {path:'patients', component:PatientsComponent,
    children:[{path:':patient_id', component:PatientPutModalComponent}]
  },
  {path:'swabs', component:SwabComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
