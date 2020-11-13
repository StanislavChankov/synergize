import { Injectable } from '@angular/core';
import { Scene } from 'babylonjs';

export class TrianglePrismOptions {
	height: number;
	aLength: number;
	bLength: number;
}

export enum TrianglePrismRotationType {
	Unspecified = 0,
	BottomLeft = 1,
	TopRight = 2
}

@Injectable()
export class TriangleMesh3dCreatorService {

	public get3dTriangleMesh(scene: Scene, opt: TrianglePrismOptions, rotation: TrianglePrismRotationType): BABYLON.Mesh {
		const positions = this.getPositionsByRotationType(opt, rotation);

		// connects the triangle dots ... counter clockwise
		const indices = this.getIndiciesByRotationType(rotation);

		// light bounce directions
		const normals = [
			0, 1, 0,	// 0
			0, 1, 0,	// 1
			0, 1, 0,	// 2
			0, 1, 0,	// 3
			0, 1, 0,	// 4
			0, 1, 0,	// 5
			0, 0, 1,	// 6
			0, 0, 1,	// 7
		];

		const vertexData = new BABYLON.VertexData();

		// stuff its buffers with your stuff
		vertexData.positions = positions;
		vertexData.indices = indices;
		vertexData.normals = normals;

		const trianglePrism = new BABYLON.Mesh('blank', scene as any);
		trianglePrism.position = BABYLON.Vector3.Zero();

		vertexData.applyToMesh(trianglePrism, true);
		trianglePrism.visibility = 0;

		return trianglePrism;
	}

	private getIndiciesByRotationType(rotation: TrianglePrismRotationType): any[] {
		const indices = [];
		if (rotation === TrianglePrismRotationType.BottomLeft) {
			indices.push(2, 0, 1);
			indices.push(5, 3, 4);
			indices.push(2, 5, 3);
			indices.push(2, 3, 0);
			indices.push(0, 3, 4);
			indices.push(0, 4, 1);
			indices.push(1, 4, 5);
			indices.push(1, 5, 2);
			indices.push(3, 5, 4);
		} else {
			indices.push(0, 3, 5);
			indices.push(5, 2, 0);
			indices.push(3, 5, 4);
			indices.push(1, 4, 3);
			indices.push(3, 0, 1);
			indices.push(2, 5, 4);
			indices.push(4, 1, 2);
			indices.push(0, 2, 1);
			indices.push(5, 3, 4);
		}

		return indices;
	}

	private getPositionsByRotationType(opt: TrianglePrismOptions, rotation: TrianglePrismRotationType): number[] {
		let positions = [];
		if (rotation === TrianglePrismRotationType.BottomLeft) {
			positions = [
				// top triangle
				2, opt.height, 2,
				0, opt.height, 2,
				2, opt.height, 0,
				// bottom triangle
				2, 0, 2,
				0, 0, 2,
				2, 0, 0,
			];
		} else {
			positions = [
				// top triangle
				0, opt.height, 0,
				0, opt.height, 2,
				2, opt.height, 0,
				// bottom triangle
				0, 0, 0,
				0, 0, 2,
				2, 0, 0,
			];
		}

		return positions;
	}
}
