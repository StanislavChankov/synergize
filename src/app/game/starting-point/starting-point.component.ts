import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/state/app.state';
import { BaseComponent } from '../../components/base.component';
import { Actions } from '@ngrx/effects';
import { SceneCreatedPayload, SceneInitializationActions } from '../../core/store/actions';
import { SceneProvider } from '../../core/services/scenes';

import {
	Engine,
	Scene,
	Color4,
} from 'babylonjs';

@Component({
	selector: 'app-starting-point',
	templateUrl: './starting-point.component.html',
	styleUrls: ['./starting-point.component.scss'],
})
export class StartingPointComponent extends BaseComponent implements AfterViewInit {

	private canvas: HTMLCanvasElement;
	@ViewChild('rendererCanvas') canvasElementRef: ElementRef;

	public constructor(
		protected store$: Store<AppState>,
		protected updates$: Actions,
		private sceneProvider: SceneProvider) {
		super(store$, updates$);
	}

	ngAfterViewInit(): void {
		this.canvas = this.canvasElementRef.nativeElement;

		var newEngine = new Engine(this.canvas,  true);
		var newScene = new Scene(newEngine);
		newScene.clearColor = new Color4(0, 0, 0, 0);

		this.sceneProvider.engine = newEngine;
		this.sceneProvider.scene = newScene;
		this.sceneProvider.canvas = this.canvas;

		const payload = {
			engine: newEngine,
			scene: newScene,
			canvas: this.canvas,
		} as SceneCreatedPayload;

		this.store$.dispatch(new SceneInitializationActions.SceneCreatedAction(payload));

		this.resizeCanvas();
	}

	private resizeCanvas() {
		this.canvasElementRef.nativeElement.width = window.innerWidth;
		this.canvasElementRef.nativeElement.height = window.innerHeight;
	}
}
