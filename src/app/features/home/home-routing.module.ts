import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@app/features/home/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }  // Маршрут по умолчанию, загружает HomeComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
