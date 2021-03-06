import { CanvasCreatedPayload } from '../../../models/events';
import { PayloadAction } from '../../models/payload-action';

export namespace SceneActions {

	//#region Canvas Created

	export const CANVAS_CREATED = 'CANVAS_CREATED';

	export class CanvasCreatedAction
		extends PayloadAction<CanvasCreatedPayload> {

		constructor(public payload: CanvasCreatedPayload) {
			super(CANVAS_CREATED, payload);
		}
	}

	//#endregion

	//#region Canvas Plane Created

	export const CANVAS_PLANE_CREATED = 'CANVAS_PLANE_CREATED';

	export class CanvasPlaneCreated
	extends PayloadAction<any> {

		constructor(public payload: any) {
			super(CANVAS_PLANE_CREATED, payload);
		}
	}

	//#endregion

	export type Actions =
		CanvasCreatedAction |
		CanvasPlaneCreated;
}
