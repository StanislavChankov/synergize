import { EnvironmentInitializationService } from '../data/environment/environment-initialization.service';
import { BoxesCreatorService } from './boxes';
import { CameraService } from './cameras';
import { EngineService } from './engine.service';
import { CharacterInitializationService } from './initialization';
import { MeshInitializationService } from './initialization/mesh-initialization.service';
import { InputHandlerService } from './input';
import { TriangleMesh3dCreatorService } from './meshes';
import { WorldAxisService } from './orientation';
import { CharacterProvider, EnvironmentProvider, SceneProvider } from './scenes';
import { PlaneService } from './terrains';
import { WindowRefService } from './windows-ref.service';

export const gameServices = [
	EngineService,
	PlaneService,
	CameraService,
	BoxesCreatorService,
	WorldAxisService,
	TriangleMesh3dCreatorService,
	WindowRefService,
	// WindowMock,
	InputHandlerService,
];

export const creatorServices = [
	MeshInitializationService,
	EnvironmentInitializationService,
	CharacterInitializationService,
];

export const providers =[
	SceneProvider,
	EnvironmentProvider,
	CharacterProvider,
];
