import { Injectable } from '@angular/core';
import { AbstractMesh, Scene, SceneLoader, StandardMaterial, Texture, Vector3 } from 'babylonjs';
import { SceneProvider } from '../../services/scenes';
import { ModelsData, ModelType } from '../models';

@Injectable()
export class EnvironmentDescription {
	public models: Array<EnvironmentModel>;
	public ground: EnvironmentModel;

	constructor(private sceneProvider: SceneProvider) {
		this.ground = {
			position: new Vector3(0, 0, 0),
			modelType: ModelType.PlaneBasic,
		} as EnvironmentModel;
		this.models = [
			{ position: new Vector3(5, 0.6, 5), modelType: ModelType.BasicRock },
			{ position: new Vector3(10, 0.6, 10), modelType: ModelType.Palm1 },
		] as Array<EnvironmentModel>;
	}

	public async initializeGround(): Promise<void> {
		if (!this.ground) {
			throw new Error('Ground object not being initialized.');
		}

		const mesh = await this.getMeshByModelType(ModelType.PlaneBasic, this.sceneProvider.scene);
		mesh.position = this.ground.position;
		const material = await this.getTextureMaterialByModelType(ModelType.PlaneBasic, this.sceneProvider.scene);
		mesh.material = material;
	}

	public async initializeEnvironment(): Promise<void> {
		if (!this.models || !this.models.length) {
			throw new Error('Ground object not being initialized.');
		}

		this.models.forEach(async model => {
			const mesh = await this.getMeshByModelType(model.modelType, this.sceneProvider.scene);
			mesh.position = model.position;
			const material = await this.getTextureMaterialByModelType(model.modelType, this.sceneProvider.scene);
			mesh.material = material;
		});
	}

	public async getMeshByModelType(modelType: ModelType, scene: Scene): Promise<AbstractMesh> {
		const modelTextureMap = ModelsData.modelTextureMap.get(modelType);
		const importResult = await SceneLoader.ImportMeshAsync('', modelTextureMap.modelPathPath , modelTextureMap.modelFileName, scene);

		if (importResult.meshes.length !== 1) {
			throw new Error(`Not supported Exception. The provided modelType: ${modelType} has different than 1 meshes inside.`);
		}

		return importResult.meshes[0];
	}

	public async getTextureMaterialByModelType(modelType: ModelType, scene: Scene): Promise<StandardMaterial> {
		const modelTextureMap = ModelsData.modelTextureMap.get(modelType);

		const textureMaterial = new StandardMaterial('greenMat', scene);
		textureMaterial.diffuseTexture = new Texture(modelTextureMap.textureFilePath, scene);

		return textureMaterial;
	}
}

export interface EnvironmentModel {
	position: Vector3;
	modelType: ModelType;
}
