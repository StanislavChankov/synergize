import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from '../../state/app.state';
import { SceneInitializationActions } from '../../actions';
import { EngineService } from '../../../services/engine.service';
import { PlaneService } from '../../../services/terrains';
import { CameraService } from '../../../services/cameras/camera.service';
import { BoxesCreatorService } from '../../../services/boxes';

@Injectable()
export class SceneInitializationEffects {

	@Effect({dispatch: false})
	public startGameButtonClickedEffect$ = this.actions$.pipe(
		ofType(SceneInitializationActions.SCENE_CREATED),
		tap((_action: SceneInitializationActions.SceneCreatedAction) => {
			this.cameraService.createCamera(_action.payload.scene, _action.payload.canvas);
			this.engine.createScene(_action.payload);
			this.engine.animate(_action.payload.scene);
			this.planeService.createPlane(_action.payload.scene);
			this.boxCreatorService.createBoxes(_action.payload.scene, 30, 30);
		}),
	);

	constructor(
		private actions$: Actions,
		private router: Router,
		private store$: Store<AppState>,
		private planeService: PlaneService,
		private cameraService: CameraService,
		private boxCreatorService: BoxesCreatorService,
		private engine: EngineService) {}
}
