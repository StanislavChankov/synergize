import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { EngineService } from '../../core/services/engine.service';
import { AppState } from '../../core/store/state/app.state';
import { BaseComponent } from '../../components/base.component';
import { Actions } from '@ngrx/effects';
import { SceneActions, SceneCreatedPayload } from '../../core/store/actions';
import { CanvasCreatedPayload } from '../../core/models/events';

import {
	Engine,
	FreeCamera,
	Scene,
	Light,
	Mesh,
	Color3,
	Color4,
	Vector3,
	HemisphericLight,
	StandardMaterial,
	Texture,
	DynamicTexture,
	MeshBuilder
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
		private engServ: EngineService,
		protected store$: Store<AppState>,
		protected updates$: Actions) {
		super(store$, updates$);
	}

	ngAfterViewInit(): void {
		this.canvas = this.canvasElementRef.nativeElement;

		const engine = new Engine(this.canvas,  true);
		const scene = new Scene(engine);
		scene.clearColor = new Color4(0, 0, 0, 0);

		// const payload = {
		// 	engine: engine,
		// 	scene: scene,
		// 	canvas: this.canvas,
		// } as SceneCreatedPayload;
		// this.store$.dispatch(new SceneActions.SceneCreatedAction(payload));

		this.engServ.createScene(scene, engine, this.canvas);
		this.engServ.animate();
		this.resizeCanvas();
	}

	public ngOnInit(): void {
		this.subscribeOn<SceneActions.CanvasPlaneCreated, any>(
			SceneActions.CANVAS_CREATED,
			this.onCanvasPlaneCreated
		);
	}

	private resizeCanvas() {
		this.canvasElementRef.nativeElement.width = window.innerWidth;
		this.canvasElementRef.nativeElement.height = window.innerHeight;
	}

	private onCanvasPlaneCreated(): void {
		debugger;
		// this.engServ.createScene(new Engine(this.canvas,  true));
		// this.engServ.animate();
		// this.resizeCanvas();
	}
}
