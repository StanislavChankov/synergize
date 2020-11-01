import { ElementRef } from "@angular/core";

export interface SceneState {
	canvas: ElementRef<HTMLCanvasElement>;
	isInitialCanvasReady: boolean;
}

