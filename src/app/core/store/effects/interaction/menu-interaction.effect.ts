import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, tap, catchError, retry } from 'rxjs/operators';
import { AppState } from '../../state/app.state';
import { MenuInteractionActions, SceneActions } from '../../actions';
import { selectCanvas } from '../../reducers/scene.reducer';


@Injectable()
export class MenuInteractionEffects {

		@Effect({dispatch: false})
		public startGameButtonClickedEffect$ = this.actions$.pipe(
			ofType(MenuInteractionActions.START_GAME_BUTTON_CLICKED),
			tap((_action: MenuInteractionActions.StartGameClickedAction) => {
				debugger;
				this.router.navigateByUrl('/game/starting');
				// this.store$.dispatch(new SceneActions.CreateCanvasAction({}));
				// this.store$
				// 	.select(selectCanvas)
				// 	.subscribe(canvas => {
				// 		if (canvas) {
				// 			this.store$.dispatch(new SceneActions.CanvasCreatedAction(canvas));
				// 		}
				// 	});
			}),
		);

		constructor(
			private actions$: Actions,
			private router: Router,
			private store$: Store<AppState>) {}
	}
