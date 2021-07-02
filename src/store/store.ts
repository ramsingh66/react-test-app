import { createStore, Reducer, Store } from "redux";
import { Action, ActionType, State } from "./types";

const reducer: Reducer<State, Action> = (state: State = { record: [] }, action: Action) => {
    switch (action.type) {
        case ActionType.SET_NAME:
            return { ...state, name: action.value }
        case ActionType.SET_AGE:
            return { ...state, age: action.value }
        case ActionType.SET_GENDER:
            return { ...state, gender: action.value }
        case ActionType.SET_ADDRESS:
            return { ...state, address: action.value }
        case ActionType.SUBMIT:
            {
                const { name, age, address, gender } = state;
                return {
                    record: [...state.record, {
                        name, age, address, gender
                    }]
                }
            }
        default:
            return state
    }
}


export const store: Store<State, Action> = createStore<State, Action, any, any>(reducer);


