import { Injectable } from '@angular/core';
import { AbstractMesh, Color3, Material, Scene, StandardMaterial, Vector3 } from 'babylonjs';
import { Random } from '../../functions';
import { Animation } from 'babylonjs';
import { TriangleMesh3dCreatorService, TrianglePrismOptions, TrianglePrismRotationType } from '../meshes/triangle-mesh-3d-creator.service';
import { SceneProvider } from '../scenes';

export interface MysteryCube {
	cubeMesh: BABYLON.Mesh;
	togggle: boolean;
}

export enum CubeMoveDirection {
	Unspecified = 0,
	Up = 1,
	Down = 2,
}

@Injectable()
export class BoxesCreatorService {
	private redMaterial: StandardMaterial;
	private greenMaterial: StandardMaterial;
	private upperYPosition = 1;
	private lowerYPosition = 0;

constructor(private sceneProvider: SceneProvider) {
}

	public createEnvironment(xLength: number, zLength): void {
		var scene = this.sceneProvider.scene;
		this.initializeMaterials(scene);

		// this.attachScenePickHandler(scene);
		const opt = new TrianglePrismOptions();
		opt.aLength = 2;
		opt.bLength = 2;
		opt.height = 2;

		// for (let zIndex = 0; zIndex < zLength; zIndex += 2) {
		// 	for (let xIndex = 0; xIndex < xLength; xIndex += 2) {
		// 		const bottomleftTriangle = this.triangleCreatorService.get3dTriangleMesh(scene, opt, TrianglePrismRotationType.BottomLeft);
		// 		bottomleftTriangle.visibility = 1;
		// 		bottomleftTriangle.position.y = 0;
		// 		bottomleftTriangle.position.x = xIndex;
		// 		bottomleftTriangle.position.z = zIndex;
		// 		bottomleftTriangle.material = this.redMaterial as any;
		// 		const topRightTriangle = this.triangleCreatorService.get3dTriangleMesh(scene, opt, TrianglePrismRotationType.TopRight);
		// 		topRightTriangle.visibility = 1;
		// 		topRightTriangle.position.y = 0;
		// 		topRightTriangle.position.x = xIndex;
		// 		topRightTriangle.position.z = zIndex;
		// 		topRightTriangle.material = this.redMaterial as any;
		// 	}
		// }

		// BABYLON.SceneLoader.ImportMesh('', './assets/3d/' , 'plane.babylon', scene as any, meshes => {
		// 	meshes.forEach(m => {
		// 		m.position.x = 0;
		// 		m.position.y = 0;
		// 		m.position.z = 0;
		// 		m.material = this.redMaterial as any;
		// 	});
		// 	// do something with the meshes and skeletons
		// 	// particleSystems are always null for glTF assets
		// 	});

		// BABYLON.SceneLoader.ImportMesh('', './assets/3d/rocks/' , 'rock-normal.babylon', scene as any, meshes => {
		// 	meshes.forEach(m => {
		// 		m.position.x = 5;
		// 		m.position.y = 5;
		// 		m.position.z = 5;
		// 		m.scaling = new BABYLON.Vector3(1, 1, 1);
		// 		m.material = this.greenMaterial as any;
		// 		// m.material = this.greenMaterial as any;
		// 	});
		// 	// do something with the meshes and skeletons
		// 	// particleSystems are always null for glTF assets
		// 	});
	}

	private initializeMaterials(scene: Scene): void {
		// red material
		this.redMaterial = new StandardMaterial('redMat', scene);
		this.redMaterial.diffuseColor = new Color3(1, 0, 0);

		// green material
		this.greenMaterial = new StandardMaterial('greenMat', scene);
		// this.greenMaterial.diffuseColor = new Color3(0, 1, 0);
		this.greenMaterial.diffuseTexture = new BABYLON.Texture('./assets/3d/rocks/Rock_6_Base_Color.jpg', scene as any) as any;
	}

	private attachScenePickHandler(scene: Scene) {
		scene.onPointerObservable.add(event => {
			if (event.pickInfo.pickedMesh) {
				const moveDirection = event.pickInfo.pickedMesh.material === this.greenMaterial
					? CubeMoveDirection.Down
					: CubeMoveDirection.Up;
				if (moveDirection === CubeMoveDirection.Down) {
					event.pickInfo.pickedMesh.material = this.redMaterial;
				} else {
					event.pickInfo.pickedMesh.material = this.greenMaterial;
				}
				this.animate(scene, event.pickInfo.pickedMesh, moveDirection);
			}
		}, BABYLON.PointerEventTypes.POINTERUP);
	}

	private animate(scene: Scene, box: AbstractMesh, direction: CubeMoveDirection): void {
		const animationSpeed = 2;
		const yMoveAnimation = this.getMoveYAnimation(animationSpeed, direction, box);
		scene.beginDirectAnimation(box, [yMoveAnimation], 0, yMoveAnimation.getHighestFrame(), false);
	}

	public getMoveYAnimation(animationSpeed: number, direction: CubeMoveDirection, mesh: AbstractMesh): Animation {
		const frameRate = 1.0 / animationSpeed;

		const meshStartY = direction === CubeMoveDirection.Down ? this.upperYPosition : this.lowerYPosition;
		const meshEndY = direction === CubeMoveDirection.Down ? this.lowerYPosition : this.upperYPosition;
		const xSlide = new Animation('ySlide', 'position.y', 1, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

		const keyFrames = [];

		keyFrames.push({
				frame: 0,
				value: meshStartY
		});

		keyFrames.push({
				frame: frameRate,
				value: meshEndY
		});

		xSlide.setKeys(keyFrames);

		return xSlide;
	}
}
