import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game.component';
import { StartingPointComponent } from './starting-point/starting-point.component';

const routes: Routes = [{
	path: '',
	component: GameComponent,
	children: [
		{
			path: 'starting',
			component: StartingPointComponent,
		},
		{ path: '', redirectTo: 'starting', pathMatch: 'full' },
		{ path: '**', redirectTo: 'starting' },
	],
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GameRoutingModule { }
