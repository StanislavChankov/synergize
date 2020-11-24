import { CharacterMovePayload } from '../../../models/events';
import { PayloadAction } from '../../models/payload-action';

export namespace CharacterMovementActions {

	//#region Character move

		export const CHARACTER_MOVE = 'CHARACTER_MOVE';

		export class CharacterMoveAction
			extends PayloadAction<CharacterMovePayload> {

			constructor(public payload: CharacterMovePayload) {
				super(CHARACTER_MOVE, payload);
			}
		}

	//#endregion

	export type Actions =
		CharacterMoveAction;
}
