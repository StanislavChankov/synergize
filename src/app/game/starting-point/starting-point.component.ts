import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { EngineService } from '../../core/services/engine.service';
import { AppState } from '../../core/store/state/app.state';
import { BaseComponent } from '../../components/base.component';
import { Actions } from '@ngrx/effects';
import { SceneActions } from '../../core/store/actions';
import { CanvasCreatedPayload } from '../../core/models/events';

@Component({
	selector: 'app-starting-point',
	templateUrl: './starting-point.component.html',
	styleUrls: ['./starting-point.component.scss'],
})
export class StartingPointComponent extends BaseComponent implements OnInit, AfterViewInit {

	private canvas: HTMLCanvasElement;
	@ViewChild('rendererCanvas') canvasElementRef: ElementRef;

	// public constructor(
	// 	private store$: Store<AppState>) {
	// 	// const globalCanvas = document.createElement('canvas');
	// 	// this.canvas = globalCanvas;
	// }

	public constructor(
		private engServ: EngineService,
		protected store$: Store<AppState>,
		protected updates$: Actions) {
		super(store$, updates$);
}
	ngAfterViewInit(): void {
		const payload = { canvasRef: this.canvasElementRef } as CanvasCreatedPayload;
		this.store$.dispatch(new SceneActions.CanvasCreatedAction(payload));

		this.engServ.createScene(this.canvas);
		this.engServ.animate();
		this.resizeCanvas();
	}

	public ngOnInit(): void {
		this.subscribeOn<SceneActions.CanvasPlaneCreated, any>(
			SceneActions.CANVAS_CREATED,
			this.onCanvasPlaneCreated
		);

		// this.engServ.createPlane();
		// this.canvas.style.backgroundColor = 'black';
		// const engineWrapper = document.getElementsByClassName('engine-wrapper')[0];
		// engineWrapper.appendChild(this.canvas);

		// this.engServ.createScene();
		// this.engServ.animate();

		// this.resizeCanvas();
	}

	private resizeCanvas() {
		this.canvasElementRef.nativeElement.width = window.innerWidth;
		this.canvasElementRef.nativeElement.height = window.innerHeight;
	}

	private onCanvasPlaneCreated(): void {
		debugger;
		this.engServ.createScene(this.canvas);
		this.engServ.animate();
		this.resizeCanvas();
	}
}
