import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { SceneInitializationActions } from '../../actions';
import { EngineService } from '../../../services/engine.service';
import { CameraService } from '../../../services/cameras/camera.service';
import { BoxesCreatorService } from '../../../services/boxes';
import { WorldAxisService } from '../../../services/orientation/world-axis.service';
import { ModelsData } from '../../../data/models';
import { SceneProvider } from '../../../services/scenes';
import { EnvironmentDescription } from '../../../data/environment/environment-description';

@Injectable()
export class SceneInitializationEffects {

	@Effect({dispatch: false})
	public startGameButtonClickedEffect$ = this.actions$.pipe(
		ofType(SceneInitializationActions.SCENE_CREATED),
		tap(async (_action: SceneInitializationActions.SceneCreatedAction) => {
			ModelsData.initModelTexture();

			this.cameraService.createCamera(_action.payload.scene, _action.payload.canvas);
			this.engine.createScene(_action.payload);
			this.engine.animate(_action.payload.scene);

			await this.environmentService.initializeGround();
			await this.environmentService.initializeEnvironment();

			// this.worldAxisService.showAxis(5, _action.payload.scene);
		}),
	);

	constructor(
		private actions$: Actions,
		private sceneProvider: SceneProvider,
		private cameraService: CameraService,
		private environmentService: EnvironmentDescription,
		private worldAxisService: WorldAxisService,
		private boxCreatorService: BoxesCreatorService,
		private engine: EngineService) {}
}
