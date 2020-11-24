import { Injectable } from '@angular/core';
import { CharacterViewModel } from '../../models/view';

@Injectable()
export class CharacterProvider {
	myCharacter: CharacterViewModel;
	characters: Array<CharacterViewModel>;
}
