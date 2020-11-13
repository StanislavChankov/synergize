import { Injectable } from '@angular/core';
import { DynamicTexture, Material, Scene, StandardMaterial } from 'babylonjs';

@Injectable()
export class WorldAxisService {

	constructor() {
		console.log('WorldAxisService has been created.');
	}

	public showAxis(size: number, scene: Scene) {
		this.addXAxisLine(size, scene);
		this.addYAxisLine(size, scene);
		this.addZAxisLines(size, scene);
	}

	private addZAxisLines(size: number, scene: Scene) {
		const axisZ = BABYLON.Mesh.CreateLines('axisZ', [
			BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
			new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
		], scene as any);
		axisZ.color = new BABYLON.Color3(0, 0, 1);
		const zChar = this.makeTextPlane('Z', 'blue', size / 10, scene);
		zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
	}

	private addYAxisLine(size: number, scene: Scene) {
		const axisY = BABYLON.Mesh.CreateLines('axisY', [
			BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
			new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
		], scene as any);
		axisY.color = new BABYLON.Color3(0, 1, 0);
		const yChar = this.makeTextPlane('Y', 'green', size / 10, scene);
		yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
	}

	private addXAxisLine(size: number, scene: Scene) {
		const axisX = BABYLON.Mesh.CreateLines('axisX', [
			BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
			new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
		], scene as any);
		axisX.color = new BABYLON.Color3(1, 0, 0);
		const xChar = this.makeTextPlane('X', 'red', size / 10, scene);
		xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
	}

	public makeTextPlane(text, color, size, scene) {
		const dynamicTexture = new DynamicTexture('DynamicTexture', 50, scene, true);
		dynamicTexture.hasAlpha = true;
		dynamicTexture.drawText(text, 5, 40, 'bold 36px Arial', color , 'transparent', true);
		const plane = BABYLON.Mesh.CreatePlane('TextPlane', size, scene, true);
		plane.material = new BABYLON.Material('TextPlaneMaterial', scene);
		plane.material.backFaceCulling = false;
		// plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
		// plane.material.diffuseTexture = dynamicTexture;
		return plane;
	}
}
