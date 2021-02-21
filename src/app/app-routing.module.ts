import { patientsTableComponent } from './components/patientsTable/patientsTable.component';
import { swabsTableComponent } from './components/swabsTable/swabsTable.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PatientAddComponent } from './components/patient-add/patient-add.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'patients',
    component: patientsTableComponent,
    children: [{ path: 'registerPatient', component: PatientAddComponent }],
  },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
