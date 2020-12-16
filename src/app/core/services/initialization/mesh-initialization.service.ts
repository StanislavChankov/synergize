import { Injectable } from '@angular/core';
import { AbstractMesh, Scene, SceneLoader, StandardMaterial, Texture } from 'babylonjs';
import { ModelsData, ModelType } from '../../data/models';
import { CharacterViewModel, EnvironmentViewModel } from '../../models/view';
import { SceneProvider } from '../scenes';

@Injectable()
export class MeshInitializationService {

	constructor(
		private sceneProvider: SceneProvider) { }

	public async initializeGround(ground: EnvironmentViewModel): Promise<void> {
		if (!ground) {
			throw new Error('Ground object not being initialized.');
		}

		const mesh = await this.getMeshByModelType(ModelType.PlaneBasic);
		mesh.position = ground.position;
		const material = await this.getTextureMaterialByModelType(ModelType.PlaneBasic, this.sceneProvider.scene);
		mesh.material = material;
	}

	public async initializeCharacter(character: CharacterViewModel): Promise<void> {
		if (!character) {
			throw new Error('Character object not being initialized.');
		}

		const mesh: AbstractMesh = await this.getMeshByModelType(character.modelType);
		mesh.position = character.position;
		const material = await this.getTextureMaterialByModelType(character.modelType, this.sceneProvider.scene);
		mesh.material = material;
		character.mesh = mesh;
	}

	public async initializeEnvironment(models: Array<EnvironmentViewModel>): Promise<void> {
		if (!models || !models.length) {
			throw new Error('Ground object is not initialized already.');
		}

		models.forEach(async model => {
			if (model.isMultiMeshModel) {
				const modelTextureMap = ModelsData.multiModelTextureMap.find(m => m.modelType === model.modelType);
				const importResult = await SceneLoader.ImportMeshAsync(
					'',
					modelTextureMap.modelPathPath,
					modelTextureMap.modelFileName,
					this.sceneProvider.scene);

					for (let i = 0; i < importResult.meshes.length; i++) {
						const mesh = importResult.meshes[i];
						const textureMaterial = await this.getTextureMaterialByMultiModelType(model.modelType, mesh.id, this.sceneProvider.scene);
						mesh.material = textureMaterial || mesh.material;
						if (mesh.id === "_radar___rotation_X_") {
							window.setInterval(() => {
								// mesh.rotation.x += 0.05;
							}, 100);
						}

						if (mesh.id === "_radar___rotation_Z_") {
							window.setInterval(() => {
								mesh.rotation.y += 0.01;
							}, 10);
						}
						// mesh.position = model.position;
					}
				} else {
					const mesh = await this.getMeshByModelType(model.modelType);
					mesh.position = model.position;
					const material = await this.getTextureMaterialByModelType(model.modelType, this.sceneProvider.scene);
					mesh.material = material;
				}
		});
	}

	public async getMeshByModelType(modelType: ModelType): Promise<AbstractMesh> {
		const modelTextureMap = ModelsData.modelTextureMap.get(modelType);
		const importResult = await SceneLoader.ImportMeshAsync(
			'',
			modelTextureMap.modelPathPath,
			modelTextureMap.modelFileName,
			this.sceneProvider.scene);

		if (importResult.meshes.length !== 1) {
			throw new Error(`Not supported Exception. The provided modelType: ${modelType} has different than 1 meshes inside.`);
		}

		return importResult.meshes[0];
	}

	public async getMeshesByModelType(modelType: ModelType): Promise<AbstractMesh[]> {
		const modelTextureMap = ModelsData.modelTextureMap.get(modelType);
		const importResult = await SceneLoader.ImportMeshAsync(
			'',
			modelTextureMap.modelPathPath,
			modelTextureMap.modelFileName,
			this.sceneProvider.scene);

		if (importResult.meshes.length <= 1) {
			throw new Error(`Not supported Exception. Unable to find more than 1 meshes.`);
		}

		return importResult.meshes;
	}

	public async getTextureMaterialByModelType(modelType: ModelType, scene: Scene): Promise<StandardMaterial> {
		const modelTextureMap = ModelsData.modelTextureMap.get(modelType);

		const textureMaterial = new StandardMaterial('random', scene);
		textureMaterial.diffuseTexture = new Texture(modelTextureMap.textureFilePath, scene);

		return textureMaterial;
	}

	public async getTextureMaterialByMultiModelType(modelType: ModelType, meshId: string,scene: Scene): Promise<StandardMaterial | undefined> {
		const multiModelTexture = ModelsData.multiModelTextureMap.find(m => m.modelType === modelType);

		const model = multiModelTexture.subModelTextures.find(t => t.subMeshId === meshId);

		if (!model) {
			return undefined;
		}

		const textureMaterial = new StandardMaterial('random', scene);
		textureMaterial.diffuseTexture = new Texture(model.subModelTextureFilePath, scene);

		return textureMaterial;
	}
}
