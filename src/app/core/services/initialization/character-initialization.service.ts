import { Injectable } from '@angular/core';
import { Vector3 } from 'babylonjs';
import { MeshInitializationService } from './mesh-initialization.service';
import { ModelType } from '../../data/models';
import { CharacterViewModel } from '../../models/view';
import { CharacterProvider } from '../scenes';

@Injectable()
export class CharacterInitializationService {

	constructor(
		private meshInitService: MeshInitializationService,
		private characterProvider: CharacterProvider) {
			characterProvider.myCharacter = {
				id: '1',
				position: new Vector3(15, 0.6, 15),
				modelType: ModelType.CharacterMale1,
			} as CharacterViewModel;
	}

	public async initializeAsync(): Promise<void> {
		await this.meshInitService.initializeCharacter(this.characterProvider.myCharacter);
	}
}
