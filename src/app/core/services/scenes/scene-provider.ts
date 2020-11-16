import { Injectable } from '@angular/core';
import { Scene } from 'babylonjs';
import { Engine } from 'babylonjs/Engines/engine';

@Injectable()
export class SceneProvider {
	scene: Scene;
	engine: Engine;
	canvas: HTMLCanvasElement;
}
