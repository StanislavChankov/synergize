import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from '../../state/app.state';
import { MenuInteractionActions } from '../../actions';

@Injectable()
export class MenuInteractionEffects {

		@Effect({dispatch: false})
		public startGameButtonClickedEffect$ = this.actions$.pipe(
			ofType(MenuInteractionActions.START_GAME_BUTTON_CLICKED),
			tap((_action: MenuInteractionActions.StartGameClickedAction) => {
				this.router.navigateByUrl('/game/starting');
			}),
		);

		constructor(
			private actions$: Actions,
			private router: Router,
			private store$: Store<AppState>) {}
	}
