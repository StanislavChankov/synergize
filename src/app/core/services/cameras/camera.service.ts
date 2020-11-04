import { Injectable } from '@angular/core';
import { FreeCamera, Scene, Vector3 } from 'babylonjs';

@Injectable()
export class CameraService {

	public createCamera(scene: Scene, canvas: HTMLCanvasElement): void {
		// create a FreeCamera, and set its position to (x:5, y:10, z:-20 )
		let camera = new FreeCamera('maincamera', new Vector3(15, 15, 0), scene);

		// target the camera to scene origin
		camera.setTarget(Vector3.Zero());
		// camera.rotation.x = 240;
		// attach the camera to the canvas
		camera.attachControl(canvas, false);
	}
}
