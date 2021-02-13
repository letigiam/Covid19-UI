import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './components/patients/patients.component';
import { SwabComponent } from './components/swab/swab.component';

const routes: Routes = [
  {path:'patients', component:PatientsComponent},
  {path:'swabs', component:SwabComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
