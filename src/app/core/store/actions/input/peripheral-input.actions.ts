import { KeyboardKeyDownPayload, KeyboardKeyUpPayload } from '../../../models/events';
import { PayloadAction } from '../../models/payload-action';

export namespace PeripheralInputActions {

	//#region Key down

	export const KEY_DOWN = 'KEY_DOWN';

	export class KeyboardKeyDownAction
		extends PayloadAction<KeyboardKeyDownPayload> {

		constructor(public payload: KeyboardKeyDownPayload) {
			super(KEY_DOWN, payload);
		}
	}

	//#endregion

	//#region Key up

	export const KEY_UP = 'KEY_UP';

	export class KeyboardKeyUpAction
		extends PayloadAction<KeyboardKeyUpPayload> {

		constructor(public payload: KeyboardKeyUpPayload) {
			super(KEY_UP, payload);
		}
	}

	//#endregion

	export type Actions =
		KeyboardKeyUpAction |
		KeyboardKeyDownAction;
}
