import { Vector3 } from 'babylonjs';

export interface CharacterMovePayload {
	characterId: string;
	position: Vector3;
}
