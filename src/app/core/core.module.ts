import { Injector, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule, StoreDevtoolsOptions } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment.prod';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { creatorServices, gameServices } from './services';
import { combinedReducers } from './store/reducers';
import { effects } from './store/effects';
import { SceneProvider } from './services/scenes';

@NgModule({
	imports: [
		CommonModule,
		StoreRouterConnectingModule.forRoot({
			routerState: RouterState.Minimal, // https://ngrx.io/guide/router-store/
		}),
		StoreModule.forRoot(combinedReducers, {
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: false,
				strictStateSerializability: true,
				strictActionSerializability: false,
				strictActionWithinNgZone: true,
				strictActionTypeUniqueness: true,
			},
		}),
		EffectsModule.forRoot(effects),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production } as StoreDevtoolsOptions),
	],
	exports: [],
	declarations: [],
})
export class CoreModule {

	static forRoot(): ModuleWithProviders<CoreModule> {
		return {
			ngModule: CoreModule,
			providers: [
				...gameServices,
				...creatorServices,
			],
		};
	}
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		throwIfAlreadyLoaded(parentModule, 'CoreModule');
	}
}
