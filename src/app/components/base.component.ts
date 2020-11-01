import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../core/store/state/app.state';
import { PayloadAction } from '../core/store/actions';
import { BasicResponse } from '../core/models/data';

export class SubscriptionActionName {
	public subscription: Subscription;
	public actionName: string;
}

@Component({
	template: ''
})
export abstract class BaseComponent implements OnDestroy {
	protected subscriptions: SubscriptionActionName[] = [];

	protected constructor(
		protected store$: Store<AppState>,
		protected updates$: Actions) {
	}

	public ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.subscription.unsubscribe());
		this.subscriptions = [];
	}

	public isObjectEmpty(obj: any): boolean {
		return !obj
		|| (Object.keys(obj).length === 0
		&& obj.constructor === Object);
	}

	public isCollectionEmpty(collection: Array<any>): boolean {
		return collection.length <= 0;
	}

	protected subscribeOn<TPayloadAction extends PayloadAction<TPayload>, TPayload>(
		actionName: string,
		callback: (action: TPayload) => void): void {
			const subsActionName = this.getSubsActionName(actionName, callback);
			this.subscriptions.push(subsActionName);
	}

	protected subscribeOnAction(
		actionName: string,
		subscription: Subscription): void {
			const subsActionName = new SubscriptionActionName();
			subsActionName.actionName = actionName;
			subsActionName.subscription = subscription;
			this.subscriptions.push(subsActionName);
	}

	protected unsubscribeOn(actionName: string): void {
		this.subscriptions = this.subscriptions.filter(subsAction => subsAction.actionName !== actionName);
	}

	private getSubsActionName<TPayloadAction extends PayloadAction<TPayload>, TPayload>(
			actionName: string,
			callback: (action: TPayload) => void): SubscriptionActionName {
				const subsActionName = new SubscriptionActionName();
				subsActionName.actionName = actionName;
				subsActionName.subscription = this.updates$
				.pipe(
						filter(action => action.type === actionName),
						map((action: TPayloadAction) => callback.bind(this)(action.payload)))
				.subscribe();

				return subsActionName;
	}

	protected mapPayload(payload: Array<BasicResponse>): Array<BasicResponse> {
		return payload.map(r => {
			return {
				id: r.id,
				name: r.name,
			} as BasicResponse;
		});
	}
}
