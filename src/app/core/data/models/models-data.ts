import { ModelType } from './model-type';
import { ModelTexture } from './model-texture';

export class ModelsData {
	static modelTextureMap: Map<ModelType, ModelTexture>;
	static initModelTexture(): void {
		if (!ModelsData.modelTextureMap) {
			ModelsData.modelTextureMap = new Map<ModelType, ModelTexture>();
			this.modelTextureMap.set(
				ModelType.PlaneBasic,
				{
					modelFileName: 'plane.babylon',
					modelPathPath: './assets/3d/',
					textureFilePath: './assets/3d/ground/Ground_Albedo.png',
				} as ModelTexture);

			this.modelTextureMap.set(
				ModelType.BasicRock,
				{
					modelFileName: 'rock-1.babylon',
					modelPathPath: './assets/3d/rocks/',
					textureFilePath: './assets/3d/rocks/textures/Rocks_Albedo.png',
				} as ModelTexture);

			this.modelTextureMap.set(
				ModelType.Palm1,
				{
					modelFileName: 'palm-1.babylon',
					modelPathPath: './assets/3d/trees/palm-1/',
					textureFilePath: './assets/3d/trees/palm-1/Palm_Tree_Albedo.png',
				} as ModelTexture);

			this.modelTextureMap.set(
				ModelType.CharacterMale1,
				{
					modelFileName: 'male-character.babylon',
					modelPathPath: './assets/3d/characters/',
					textureFilePath: './assets/3d/characters/male_character_texture.jpg',
				} as ModelTexture);
		}
	}
}
