import { Injectable } from '@angular/core';
import { Scene } from 'babylonjs';

@Injectable()
export class CameraService {

	public createCamera(scene: Scene, canvas: HTMLCanvasElement): void {
		const camera = new BABYLON.ArcRotateCamera('camera1',  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene as any);

		camera.setPosition(new BABYLON.Vector3(0, 20, -10));

		camera.attachControl(canvas, true);
	}
}
