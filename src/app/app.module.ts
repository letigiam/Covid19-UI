import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
// importo il modulo di un client esterno
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PatientsComponent } from './components/patients/patients.component';
import { SwabComponent } from './components/swab/swab.component';
import { TablePaginationPatientsComponent } from './components/table-pagination-patients/table-pagination-patients.component';
import { MatInputModule } from '@angular/material/input';

import { CalendarComponent } from './components/calendar/calendar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { TablePaginationSwabsComponent } from './components/table-pagination-swabs/table-pagination-swabs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientAddComponent } from './components/patient-add/patient-add.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PatientsComponent,
    SwabComponent,
    TablePaginationPatientsComponent,
    CalendarComponent,
    TablePaginationSwabsComponent,
    PatientAddComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgbModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
