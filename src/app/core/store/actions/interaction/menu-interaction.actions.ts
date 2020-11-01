import { Action } from '@ngrx/store';

export namespace MenuInteractionActions {

	export const START_GAME_BUTTON_CLICKED = 'START_GAME_BUTTON_CLICKED';
	export class StartGameClickedAction implements Action {
		readonly type = START_GAME_BUTTON_CLICKED;
		constructor(public payload: any) {}
	}

	export type Actions =
		StartGameClickedAction;
}
