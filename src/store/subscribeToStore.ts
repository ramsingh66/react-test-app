import { store } from "./store";
import { Action, State } from "./types";

export function subscribeToStore(callback: (update: State) => void) {
    store.subscribe(() => callback(store.getState()))
}

export function dispatchAction(action: Action) {
    store.dispatch(action)
}