import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuInteractionActions } from '../../core/store/actions';
import { AppState } from '../../core/store/state/app.state';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

	public folder: string;
	constructor(
		private activatedRoute: ActivatedRoute,
		protected store$: Store<AppState>) { }

	ngOnInit() {
		this.folder = this.activatedRoute.snapshot.paramMap.get('id');
	}

	public onStartGameClicked(): void {
		this.store$.dispatch(new MenuInteractionActions.StartGameClickedAction({}));
	}
}
