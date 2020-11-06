import { Injectable } from '@angular/core';
import { Scene } from 'babylonjs';

export interface TrianglePrismOptions {
	height: number;
	aLength: number;
	bLength: number;
}

@Injectable()
export class TriangleMesh3dCreatorService {

	public get3dTriangleMesh(scene: Scene, options: TrianglePrismOptions): BABYLON.Mesh {
		const positions = [
			// top triangle
			1, 2, 0,
			2, 2, 0,
			1, 2, 2,
			// bottom triangle
			1, 0, 0,
			2, 0, 0,
			1, 0, 2,
		];

		// connects the triangle dots ... counter clockwise
		const indices = [];
		indices.push(2, 0, 1);
		indices.push(5, 3, 4);
		indices.push(2, 5, 3);
		indices.push(2, 3, 0);
		indices.push(0, 3, 4);
		indices.push(0, 4, 1);
		indices.push(1, 4, 5);
		indices.push(1, 5, 2);
		indices.push(3, 5, 4);

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
}
