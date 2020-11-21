import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { SceneInitializationActions } from '../../actions';
import { EngineService } from '../../../services/engine.service';
import { CameraService } from '../../../services/cameras/camera.service';
import { EnvironmentDescription } from '../../../data/environment/environment-description';
import { InputHandlerService } from '../../../services/input';
import { ModelsData } from '../../../data/models';

@Injectable()
export class SceneInitializationEffects {

	@Effect({dispatch: false})
	public startGameButtonClickedEffect$ = this.actions$.pipe(
		ofType(SceneInitializationActions.SCENE_CREATED),
		tap(async (_action: SceneInitializationActions.SceneCreatedAction) => {
			ModelsData.initModelTexture();

			this.inputHandlerService.registerInputHandlers();

			this.cameraService.createCamera(_action.payload.scene, _action.payload.canvas);
			this.engine.createScene(_action.payload);
			this.engine.animate(_action.payload.scene);

			await this.environmentService.initializeGround();
			await this.environmentService.initializeCharacter();
			await this.environmentService.initializeEnvironment();

			// this.worldAxisService.showAxis(5, _action.payload.scene);
		}),
	);

	constructor(
		private actions$: Actions,
		private cameraService: CameraService,
		private environmentService: EnvironmentDescription,
		private inputHandlerService: InputHandlerService,
		private engine: EngineService) {}
}
