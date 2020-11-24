import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Axis } from 'babylonjs';
import { tap } from 'rxjs/operators';
import { CharacterProvider } from '../../../services/scenes';
import { CharacterMovementActions } from '../../actions';

@Injectable()
export class CharacterMovementEffects {

	@Effect({dispatch: false})
	public characterMoveEffect$ = this.actions$.pipe(
		ofType(CharacterMovementActions.CHARACTER_MOVE),
		tap((_action: CharacterMovementActions.CharacterMoveAction) => {
			const char = this.characterProvider.myCharacter.id === _action.payload.characterId
				? this.characterProvider.myCharacter
				: this.characterProvider.characters.find(ch => ch.id === _action.payload.characterId);

				char.mesh.rotate(Axis.Z, 0.01, BABYLON.Space.LOCAL);
				char.mesh.translate(Axis.Y, 0.1, BABYLON.Space.LOCAL);
		}),
	);

	constructor(
		private characterProvider: CharacterProvider,
		private actions$: Actions) {}
}
