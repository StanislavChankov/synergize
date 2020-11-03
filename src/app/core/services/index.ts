import { BoxesCreatorService } from './boxes';
import { CameraService } from './cameras';
import { EngineService } from './engine.service';
import { PlaneService } from './terrains';
import { WindowRefService } from './windows-ref.service';

export const gameServices = [
	EngineService,
	PlaneService,
	CameraService,
	WindowRefService,
	BoxesCreatorService
	// WindowMock,
];
