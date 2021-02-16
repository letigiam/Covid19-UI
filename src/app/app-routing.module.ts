import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PatientAddComponent } from './components/patient-add/patient-add.component';
import { PatientsComponent } from './components/patients/patients.component';
import { SwabComponent } from './components/swab/swab.component';

const routes: Routes = [
  {
    path: 'patients',
    component: PatientsComponent,
    children: [{ path: 'registerPatient', component: PatientAddComponent }],
  },
  { path: 'swabs', component: SwabComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
