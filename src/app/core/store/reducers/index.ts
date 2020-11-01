import { ActionReducerMap } from '@ngrx/store';
import * as scene from './scene.reducer';
import { AppState } from '../state/app.state';

export const combinedReducers: ActionReducerMap<AppState> = {
	scene: scene.reducer,
};
