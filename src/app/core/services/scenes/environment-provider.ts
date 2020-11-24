import { Injectable } from '@angular/core';
import { EnvironmentViewModel } from '../../models/view';

@Injectable()
export class EnvironmentProvider {
	ground: EnvironmentViewModel;
	models: Array<EnvironmentViewModel>;
}
