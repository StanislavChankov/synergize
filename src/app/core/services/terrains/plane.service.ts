import { Injectable } from '@angular/core';
import { MeshBuilder, Plane, Vector3 } from 'babylonjs';
import { Scene } from 'babylonjs/scene';

@Injectable()
export class PlaneService {

	public createPlane(scene: Scene, size: number): void {
		const plane1 = new Plane(1, 1, 1, 1);
		const plane = BABYLON.MeshBuilder.CreatePlane('ground', { size: size, height: size }, scene as any);

		plane.rotation.x = Math.PI * 0.5;
		plane.position.y = -1;
		plane.position.x = 15;
		plane.position.z = 15;
	}
}
