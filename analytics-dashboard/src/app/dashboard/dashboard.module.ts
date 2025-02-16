import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    DashboardComponent,
    MatCardModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule
  ]
})
export class DashboardModule { }