import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Vector3 } from 'babylonjs';
import { PeripheralInputActions } from '../../actions';
import { AppState } from '../../state/app.state';
import { CharacterMovementActions } from '../../actions';
import { CharacterMovePayload } from '../../../models/events';
import { CharacterProvider } from '../../../services/scenes';

@Injectable()
export class PeripheralInputEffects {

	private movementKeyCodes = new Array<string>(...['KeyW', 'KeyA', 'KeyS', 'KeyD']);
	@Effect({dispatch: false})
	public keyboardKeyDownEffect$ = this.actions$.pipe(
		ofType(PeripheralInputActions.KEY_DOWN),
		tap(async (_action: PeripheralInputActions.KeyboardKeyDownAction) => {
			if (this.movementKeyCodes.includes(_action.payload.keycode)) {
				const newPosition = this.getNewCharacterPosition(this.characterProvider.myCharacter.position,  _action.payload.keycode);
				console.log(newPosition.y);
				const payload = {
					characterId: this.characterProvider.myCharacter.id,
					position: newPosition,
				} as CharacterMovePayload;
				this.store$.dispatch(new CharacterMovementActions.CharacterMoveAction(payload));
			} else {
				console.log('Not implemented Keyboard Key.');
			}
		}),
	);

	private getNewCharacterPosition(currentPosition: Vector3, keycode: string): Vector3 {
		return new Vector3(currentPosition.x + 1, currentPosition.y, currentPosition.z);
	}

	constructor(
		private actions$: Actions,
		private characterProvider: CharacterProvider,
		private store$: Store<AppState>) {}
}
