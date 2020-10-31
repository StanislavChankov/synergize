import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
		CommonModule,
		FormsModule,
    IonicModule,
		StatisticsRoutingModule,
  ]
})
export class StatisticsModule { }
