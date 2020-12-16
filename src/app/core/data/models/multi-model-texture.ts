import { ModelType } from "./model-type";

export interface MultiModelTexture {
	modelType: ModelType,
	modelFileName: string;
	modelPathPath: string;
	subModelTextures: Array<SubModelTexture>;
}

export interface SubModelTexture {
	subMeshId: string;
	subModelTextureFilePath: string;
}
