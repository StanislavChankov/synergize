import { Injectable } from '@angular/core';
import { AbstractMesh, Color3, Material, Scene, StandardMaterial } from 'babylonjs';
import { Random } from '../../functions';
import { Animation } from 'babylonjs';

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
	private upperYPosition = 2;
	private lowerYPosition = 1;

	public createBoxes(scene: Scene, xLength: number, zLength): void {
		this.initializeMaterials(scene);

		const boxOptions = { width: 2, height: 2, depth: 2 };
		const boxes = new Array<MysteryCube>();

		for (let xIndex = 0; xIndex < xLength; xIndex += 2) {
			for (let zIndex = 0; zIndex < zLength; zIndex += 2) {
				const box = BABYLON.MeshBuilder.CreateBox('box', boxOptions, scene as any);
				// console.log(`Box created on x${xIndex}, z:${zIndex}`);
				box.position.x = xIndex;
				box.position.z = zIndex;
				box.overlayColor = new BABYLON.Color3(1, 1, 1);

				const toggled = Random.GetRandomBoolean();
				box.material = toggled
					? this.greenMaterial as any
					: this.redMaterial;
				box.position.y = toggled
					? this.upperYPosition
					: this.lowerYPosition;
				const mb = {
					cubeMesh: box,
					togggle: toggled,
				} as MysteryCube;
				boxes.push(mb);
			}
		}

		this.attachScenePickHandler(scene);
	}

	private initializeMaterials(scene: Scene): void {
		// red material
		this.redMaterial = new StandardMaterial('redMat', scene);
		this.redMaterial.diffuseColor = new Color3(1, 0, 0);

		// green material
		this.greenMaterial = new StandardMaterial('greenMat', scene);
		this.greenMaterial.diffuseColor = new Color3(0, 1, 0);
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
		let animationSpeed = 2;
    let yMoveAnimation = this.getMoveYAnimation(animationSpeed, direction);
		scene.beginDirectAnimation(box, [yMoveAnimation], 0, yMoveAnimation.getHighestFrame(), false);
	}

	public getMoveYAnimation(animationSpeed: number, direction: CubeMoveDirection): Animation {
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
