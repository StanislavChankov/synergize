import { Injectable } from '@angular/core';
import { Material, Scene } from 'babylonjs';
import { Random } from '../../functions';

export interface MysteryCube {
	cubeMesh: BABYLON.Mesh;
	togggle: boolean;
}

@Injectable()
export class BoxesCreatorService {

	public createBoxes(scene: Scene, xLength: number, zLength): void {
		const boxOptions = { width: 2, height: 2, depth: 2 };
		const boxes = new Array<MysteryCube>();
		for (let xIndex = 0; xIndex < xLength; xIndex += 2) {
			for (let zIndex = 0; zIndex < zLength; zIndex += 2) {
				const box = BABYLON.MeshBuilder.CreateBox('box', boxOptions, scene as any);
				console.log(`Box created on x${xIndex}, z:${zIndex}`);
				// box.position.y = 2;
				box.position.x = xIndex;
				box.position.z = zIndex;
				box.overlayColor = new BABYLON.Color3(1, 1, 1);

				var redMat = new BABYLON.StandardMaterial('redMat', scene as any);
				redMat.diffuseColor = BABYLON.Color3.FromHexString('#db3125');

				// green material
				var greenMat = new BABYLON.StandardMaterial('greenMat', scene as any);
				greenMat.diffuseColor = BABYLON.Color3.FromHexString('#2ecc71');

				const toggled = Random.GetRandomBoolean();
				box.material = toggled
					? greenMat
					: redMat;
				box.position.y = toggled
					? 2
					: 1;
				const mb = {
					cubeMesh: box,
					togggle: toggled,
				} as MysteryCube;
				boxes.push(mb);
			// 	box.actionManager.registerAction(
			// 		new BABYLON.InterpolateValueAction(
			// 				BABYLON.ActionManager.OnLeftPickTrigger,
			// 				box,
			// 				'diffuseColor',
			// 				BABYLON.Color3.Black(),
			// 				1000
			// 		)
			// );
			}
		}

		// red mat
		var redMat = new BABYLON.StandardMaterial('redMat', scene as any);
		redMat.diffuseColor = BABYLON.Color3.FromHexString('#db3125');

		// green material
		var greenMat = new BABYLON.StandardMaterial('greenMat', scene as any);
		greenMat.diffuseColor = BABYLON.Color3.FromHexString('#2ecc71');

		scene.onPointerObservable.add(evt => {
			if (evt.pickInfo.pickedMesh) {
				if (evt.pickInfo.pickedMesh.material === greenMat) {
						evt.pickInfo.pickedMesh.material = redMat;
						evt.pickInfo.pickedMesh.position.y = 1;
				} else {
						evt.pickInfo.pickedMesh.material = greenMat as any;
						evt.pickInfo.pickedMesh.position.y = 2;
				}
		}
	}, BABYLON.PointerEventTypes.POINTERUP);

	// 	boxes.forEach(box => {
	// 		debugger;
	// 		box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
	// 			BABYLON.ActionManager.OnKeyDownTrigger,
	// 			evt => {
	// 				debugger;
	// 				if (evt.sourceEvent.type === 'keydown') {
	// 					var material = new BABYLON.StandardMaterial('standard-mat2', scene as any);
	// 					material.alpha = 1;
	// 					material.diffuseColor = BABYLON.Color3.Black();

	// 					evt.meshUnderPointer.material = material;
	// 				}
	// 	}));
	// });
	}
}
