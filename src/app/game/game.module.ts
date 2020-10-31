import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { RouterModule } from '@angular/router';
import { GameComponent } from './game.component';

@NgModule({
	declarations: [GameComponent],
	imports: [
		CommonModule,
		RouterModule,
		GameRoutingModule,
	]
})
export class GameModule { }
