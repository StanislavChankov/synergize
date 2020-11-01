import { Action } from '@ngrx/store';

export class PayloadAction<TPayload> implements Action {
	public readonly type: string;
	public payload: TPayload;

	constructor(type: string, payload: TPayload) {
		this.type = type;
		this.payload = payload;
	}
}
