import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { SceneInitializationActions } from '../../actions';
import { EngineService } from '../../../services/engine.service';
import { CameraService } from '../../../services/cameras/camera.service';
import { BoxesCreatorService } from '../../../services/boxes';
import { WorldAxisService } from '../../../services/orientation/world-axis.service';

@Injectable()
export class SceneInitializationEffects {

	@Effect({dispatch: false})
	public startGameButtonClickedEffect$ = this.actions$.pipe(
		ofType(SceneInitializationActions.SCENE_CREATED),
		tap((_action: SceneInitializationActions.SceneCreatedAction) => {
			this.cameraService.createCamera(_action.payload.scene, _action.payload.canvas);
			this.engine.createScene(_action.payload);
			this.engine.animate(_action.payload.scene);
			const planeSize = 10;
			// this.planeService.createPlane(_action.payload.scene, planeSize);
			this.boxCreatorService.createBoxes(_action.payload.scene, planeSize, planeSize);

			this.worldAxisService.showAxis(5, _action.payload.scene);
		}),
	);

	constructor(
		private actions$: Actions,
		private cameraService: CameraService,
		private worldAxisService: WorldAxisService,
		private boxCreatorService: BoxesCreatorService,
		private engine: EngineService) {}
}
