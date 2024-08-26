import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  RecruiterDashboardComponent
} from '@app/features/recruiter/pages/recruiter-dashboard/recruiter-dashboard.component';

const routes: Routes = [
  { path: '', component: RecruiterDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
