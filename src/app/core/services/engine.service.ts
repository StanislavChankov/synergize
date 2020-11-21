import { WindowRefService } from './windows-ref.service';
import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import {
	Engine,
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
} from 'babylonjs';
import 'babylonjs-materials';

import { AppState } from '../store/state/app.state';
import { SceneActions, SceneCreatedPayload } from '../store/actions';

@Injectable()
export class EngineService {
private canvas: HTMLCanvasElement;
private engine: Engine;
private scene: Scene;
private light: Light;

	private sphere: Mesh;

	public constructor(
		private ngZone: NgZone,
		private store$: Store<AppState>,
		private windowRef: WindowRefService) {}

	public createScene(payload: SceneCreatedPayload): void {
		// // The first step is to get the reference of the canvas element from our HTML document
		this.canvas = payload.canvas;

		// Then, load the Babylon 3D engine:
		this.engine = payload.engine;

		// create a basic BJS Scene object
		this.scene = payload.scene; // new Scene(engine);
		this.scene.clearColor = new Color4(0, 0, 0, 0);

		// create a basic light, aiming 0,1,0 - meaning, to the sk
		this.light = new HemisphericLight('light1', new Vector3(-50, 30, -50), this.scene);

		// create a built-in "sphere" shape; its constructor takes 4 params: name, subdivisions, radius, scene
		// this.sphere = Mesh.CreateSphere('sphere1', 16, 2, this.scene);

		// create the material with its texture for the sphere and assign it to the sphere
		const spherMaterial = new StandardMaterial('sun_surface', this.scene);
		spherMaterial.diffuseTexture = new Texture('assets/textures/sun.jpg', this.scene);
		// this.sphere.material = spherMaterial;

		// move the sphere upward 1/2 of its height
		// this.sphere.position.y = 1;

		// this.registerSphereRotation();

		// generates the world x-y-z axis for better understanding
		// this.showWorldAxis(8, this.scene);
	}

	public animate(scene: Scene): void {
		// We have to run this outside angular zones,
		// because it could trigger heavy changeDetection cycles.
		this.ngZone.runOutsideAngular(() => {
			const rendererLoopCallback = () => {
				scene.render();
			};

			if (this.windowRef.document.readyState !== 'loading') {
				this.engine.runRenderLoop(rendererLoopCallback);
			} else {
				this.windowRef.window.addEventListener('DOMContentLoaded', () => {
					this.engine.runRenderLoop(rendererLoopCallback);
				});
			}

			this.windowRef.window.addEventListener('resize', () => {
				this.engine.resize();
			});
		});
	}

	/*
   * creates the world axes
   *
   * Source: https://doc.babylonjs.com/snippets/world_axes
   *
   * @param size number
   */
	public showWorldAxis(size: number, scene: Scene): void {

		const makeTextPlane = (text: string, color: string, textSize: number) => {
				const dynamicTexture = new DynamicTexture('DynamicTexture', 50, scene, true);
				dynamicTexture.hasAlpha = true;
				dynamicTexture.drawText(text, 5, 40, 'bold 36px Arial', color , 'transparent', true);
				const plane = Mesh.CreatePlane('TextPlane', textSize, scene, true);
				const material = new StandardMaterial('TextPlaneMaterial', scene);
				material.backFaceCulling = false;
				material.specularColor = new BABYLON.Color3(0, 0, 0);
				material.diffuseTexture = dynamicTexture;
				plane.material = material;

			return plane;
		};

		const axisX = Mesh.CreateLines(
			'axisX',
			[
				Vector3.Zero(),
				new Vector3(size, 0, 0), new Vector3(size * 0.95, 0.05 * size, 0),
				new Vector3(size, 0, 0), new Vector3(size * 0.95, -0.05 * size, 0)
			],
			scene
		);

		axisX.color = new BABYLON.Color3(1, 0, 0);
		const xChar = makeTextPlane('X', 'red', size / 10);
		xChar.position = new Vector3(0.9 * size, -0.05 * size, 0);

		const axisY = Mesh.CreateLines(
			'axisY',
			[
				Vector3.Zero(), new Vector3(0, size, 0), new Vector3( -0.05 * size, size * 0.95, 0),
				new Vector3(0, size, 0), new Vector3( 0.05 * size, size * 0.95, 0)
			],
			scene
		);

		axisY.color = new Color3(0, 1, 0);
		const yChar = makeTextPlane('Y', 'green', size / 10);
		yChar.position = new Vector3(0, 0.9 * size, -0.05 * size);

		const axisZ = Mesh.CreateLines(
			'axisZ',
			[
				Vector3.Zero(), new Vector3(0, 0, size), new Vector3( 0 , -0.05 * size, size * 0.95),
				new Vector3(0, 0, size), new Vector3( 0, 0.05 * size, size * 0.95)
			],
			scene
		);

		axisZ.color = new Color3(0, 0, 1);
		const zChar = makeTextPlane('Z', 'blue', size / 10);
		zChar.position = new Vector3(0, 0.05 * size, 0.9 * size);
	}
}
