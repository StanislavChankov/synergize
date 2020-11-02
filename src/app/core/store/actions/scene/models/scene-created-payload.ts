import { Engine, Scene } from 'babylonjs';

export interface SceneCreatedPayload {
	scene: Scene;
	engine: Engine;
	canvas: HTMLCanvasElement;
}
