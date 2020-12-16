import { Vector3 } from 'babylonjs';
import { ModelType } from '../../data/models';

export interface EnvironmentViewModel {
	position: Vector3;
	modelType: ModelType;
	isMultiMeshModel: boolean;
}
