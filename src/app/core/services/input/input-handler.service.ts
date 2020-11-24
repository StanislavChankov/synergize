import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { KeyboardKeyUpPayload } from '../../models/events';
import { PeripheralInputActions } from '../../store/actions';
import { AppState } from '../../store/state/app.state';
import { SceneProvider } from '../scenes';

@Injectable()
export class InputHandlerService {

	constructor(
		private store$: Store<AppState>,
		private sceneProvider: SceneProvider) { }

	public registerInputHandlers(): void {
		this.sceneProvider.scene.onKeyboardObservable.add((kbInfo) => {
			switch (kbInfo.type) {
					case BABYLON.KeyboardEventTypes.KEYDOWN:
						console.log('KEY DOWN: ', kbInfo.event.code);
						const keyDownPayload = { keycode: kbInfo.event.code,  } as KeyboardKeyUpPayload;
						this.store$.dispatch(new PeripheralInputActions.KeyboardKeyDownAction(keyDownPayload));
						break;
					case BABYLON.KeyboardEventTypes.KEYUP:
						console.log('KEY UP: ', kbInfo.event.code);
						const keyUpPayload = { keycode: kbInfo.event.code } as KeyboardKeyUpPayload;
						this.store$.dispatch(new PeripheralInputActions.KeyboardKeyUpAction(keyUpPayload));
						break;
			}
		});
	}
}
