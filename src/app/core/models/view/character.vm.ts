import { AbstractMesh, Vector3 } from 'babylonjs';
import { ModelType } from '../../data/models';

export interface CharacterViewModel {
	id: string;
	position: Vector3;
	modelType: ModelType;
	mesh: AbstractMesh;
}
