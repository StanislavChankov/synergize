import { Injectable } from '@angular/core';
import { Vector3 } from 'babylonjs';
import { ModelType } from '../models';
import { EnvironmentViewModel } from '../../models/view';
import { EnvironmentProvider } from '../../services/scenes';
import { MeshInitializationService } from '../../services/initialization';

@Injectable()
export class EnvironmentInitializationService {

	constructor(
		private meshInitService: MeshInitializationService,
		private environmentProvider: EnvironmentProvider) {
		// this.character = {
		// 	position: new Vector3(15, 0.6, 15),
		// 	modelType: ModelType.CharacterMale1,
		// } as EnvironmentViewModel;

		environmentProvider.ground = {
			position: new Vector3(0, 0, 0),
			modelType: ModelType.PlaneBasic,
		} as EnvironmentViewModel;
		environmentProvider.models = [
			{ position: new Vector3(5, 0.6, 5), modelType: ModelType.BasicRock },
			{ position: new Vector3(10, 0.6, 10), modelType: ModelType.Palm1 },
		] as Array<EnvironmentViewModel>;
	}

	public async initializeAsync(): Promise<void> {
		await this.meshInitService.initializeGround(this.environmentProvider.ground);
		await this.meshInitService.initializeEnvironment(this.environmentProvider.models);
	}
}
