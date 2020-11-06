import { BoxesCreatorService } from './boxes';
import { CameraService } from './cameras';
import { EngineService } from './engine.service';
import { TriangleMesh3dCreatorService } from './meshes';
import { WorldAxisService } from './orientation';
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
];
