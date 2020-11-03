import { PayloadAction } from '../../models/payload-action';
import { SceneCreatedPayload } from './models/scene-created-payload';

export namespace SceneInitializationActions {

	//#region Scene Created

	export const SCENE_CREATED = 'SCENE_CREATED';

	export class SceneCreatedAction
		extends PayloadAction<SceneCreatedPayload> {

		constructor(public payload: SceneCreatedPayload) {
			super(SCENE_CREATED, payload);
		}
	}

	//#endregion

	export type Actions =
		SceneCreatedAction;
}
