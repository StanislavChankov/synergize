import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { SceneState } from '../state/scene.state';
import { SceneActions } from '../actions';

const initialState: SceneState = {
	canvas: undefined,
	isInitialCanvasReady: false,
};

export function reducer(state = initialState, action: SceneActions.Actions): SceneState {
	switch (action.type) {
		case SceneActions.CANVAS_CREATED:
			debugger;

			return Object.assign({}, state, {
				canvas: action.payload.canvasRef,
				isInitialCanvasReady: true,
			});
		default: {
			return state;
		}
	}
}

const selectScene = (state: AppState) => state.scene;

export const selectCanvas = createSelector(selectScene, (state: SceneState) => {
	debugger;
	return state.canvas;
});
