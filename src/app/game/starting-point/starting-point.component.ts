import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/state/app.state';
import { BaseComponent } from '../../components/base.component';
import { Actions } from '@ngrx/effects';
import { SceneCreatedPayload, SceneInitializationActions } from '../../core/store/actions';

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
export class StartingPointComponent extends BaseComponent implements OnInit, AfterViewInit {

	private canvas: HTMLCanvasElement;
	@ViewChild('rendererCanvas') canvasElementRef: ElementRef;

	public constructor(
		protected store$: Store<AppState>,
		protected updates$: Actions) {
		super(store$, updates$);
	}

	ngAfterViewInit(): void {
		this.canvas = this.canvasElementRef.nativeElement;

		var newEngine = new Engine(this.canvas,  true);
		var newScene = new Scene(newEngine);
		newScene.clearColor = new Color4(0, 0, 0, 0);

		const payload = {
			engine: newEngine,
			scene: newScene,
			canvas: this.canvas,
		} as SceneCreatedPayload;

		this.store$.dispatch(new SceneInitializationActions.SceneCreatedAction(payload));

		this.resizeCanvas();
	}

	public ngOnInit(): void {
	}

	private resizeCanvas() {
		this.canvasElementRef.nativeElement.width = window.innerWidth;
		this.canvasElementRef.nativeElement.height = window.innerHeight;
	}
}
