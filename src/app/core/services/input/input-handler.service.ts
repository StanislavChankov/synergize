import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PeripheralInputActions } from '../../store/actions';
import { AppState } from '../../store/state/app.state';
import { SceneProvider } from '../scenes';

@Injectable()
export class InputHandlerService {

	constructor(
		protected store$: Store<AppState>,
		private sceneProvider: SceneProvider) { }

	public registerInputHandlers(): void {
		this.sceneProvider.scene.onKeyboardObservable.add((kbInfo) => {
			switch (kbInfo.type) {
					case BABYLON.KeyboardEventTypes.KEYDOWN:
						console.log('KEY DOWN: ', kbInfo.event.code);
						const keyDownPayload = new PeripheralInputActions.KeyboardKeyDownAction({ keycode: kbInfo.event.code });
						this.store$.dispatch(keyDownPayload);
						break;
					case BABYLON.KeyboardEventTypes.KEYUP:
						console.log('KEY UP: ', kbInfo.event.code);
						const keyUpPayload = new PeripheralInputActions.KeyboardKeyUpAction({ keycode: kbInfo.event.code });
						this.store$.dispatch(keyUpPayload);
						break;
			}
		});
	}
}
