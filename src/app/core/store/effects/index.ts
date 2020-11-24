import { inputEffects } from './input';
import { interactionEffects } from './interaction';
import { movementEffects } from './movement';
import { sceneEffects } from './scene';

export const effects = [
	...interactionEffects,
	...sceneEffects,
	...inputEffects,
	...movementEffects,
];
